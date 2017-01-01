import React, { Component, PropTypes } from 'react';
import { ScrollView, Animated, Platform, Easing, I18nManager } from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';

const IS_RTL = I18nManager.isRTL;

export default class Carousel extends Component {

    static propTypes = {
        ...ScrollView.propTypes,
        
        itemWidth: PropTypes.number.isRequired,
        
        sliderWidth: PropTypes.number.isRequired,
        
        activeSlideOffset: PropTypes.number,
       
        animationFunc: PropTypes.string,
        
        animationOptions: PropTypes.object,
       
        autoplay: PropTypes.bool,
        
        autoplayDelay: PropTypes.number,
        
        autoplayInterval: PropTypes.number,
      
        carouselHorizontalPadding: PropTypes.number,
        
        containerCustomStyle: ScrollView.propTypes.style,
        
        contentContainerCustomStyle: ScrollView.propTypes.style,
       
        enableMomentum: PropTypes.bool,
        
        enableSnap: PropTypes.bool,
        
        firstItem: PropTypes.number,
       
        inactiveSlideOpacity: PropTypes.number,
       
        inactiveSlideScale: PropTypes.number,
       
        slideStyle: Animated.View.propTypes.style,
       
        shouldOptimizeUpdates: PropTypes.bool,
        
       
        snapOnAndroid: PropTypes.bool,
      
        swipeThreshold: PropTypes.number,
       
        onScrollViewScroll: PropTypes.func,
       
        onSnapToItem: PropTypes.func
    };

    static defaultProps = {
        activeSlideOffset: 25,
        animationFunc: 'timing',
        animationOptions: {
            easing: Easing.elastic(1)
        },
        autoplay: false,
        autoplayDelay: 5000,
        autoplayInterval: 3000,
        carouselHorizontalPadding: null,
        containerCustomStyle: {},
        contentContainerCustomStyle: {},
        enableMomentum: false,
        enableSnap: true,
        firstItem: 0,
        inactiveSlideOpacity: 1,
        inactiveSlideScale: 0.9,
        slideStyle: {},
        shouldOptimizeUpdates: true,
        snapOnAndroid: true,
        swipeThreshold: 20
    }

    constructor (props) {
        super(props);
        this.state = {
            activeItem: this._getFirstItem(props.firstItem),
            interpolators: [],
            oldItemIndex: this._getFirstItem(props.firstItem)
        };
        this._positions = [];
        this._calcCardPositions(props);
        this._onTouchStart = this._onTouchStart.bind(this);
        this._onScroll = this._onScroll.bind(this);
        this._onScrollEnd = this._snapEnabled ? this._onScrollEnd.bind(this) : false;
        this._onScrollBegin = this._snapEnabled ? this._onScrollBegin.bind(this) : false;
        this._initInterpolators = this._initInterpolators.bind(this);
        this._onTouchRelease = this._onTouchRelease.bind(this);
        this._ignoreNextMomentum = false;
    }
    componentDidMount () {
        const { firstItem, autoplay } = this.props;
        const _firstItem = this._getFirstItem(firstItem);

        this._initInterpolators(this.props);

        setTimeout(() => {
            this.snapToItem(_firstItem, false, false, true);

            if (autoplay) {
                this.startAutoplay();
            }
        }, 0);
    }
    shouldComponentUpdate (nextProps, nextState) {
        if (this.props.shouldOptimizeUpdates === false) {
            return true;
        } else {
            return shallowCompare(this, nextProps, nextState);
        }
    }
    componentWillReceiveProps (nextProps) {
        const { activeItem, interpolators } = this.state;
        const { firstItem } = nextProps;
        const _firstItem = this._getFirstItem(firstItem, nextProps);
        const childrenLength = React.Children.count(nextProps.children);
        const newActiveItem = activeItem || activeItem === 0 ? activeItem : _firstItem;

        if (childrenLength && interpolators.length !== childrenLength) {
            this._positions = [];
            this._calcCardPositions(nextProps);
            this._initInterpolators(nextProps);
            this.setState({ activeItem: newActiveItem });

            if (IS_RTL) {
                this.snapToItem(newActiveItem, false, false, true);
            }
        }
    }
    componentWillUnmount () {
        this.stopAutoplay();
    }
    get _snapEnabled () {
        const { enableSnap, snapOnAndroid } = this.props;

        return enableSnap && (Platform.OS === 'ios' || snapOnAndroid);
    }
    get currentIndex () {
        return this.state.activeItem;
    }
    _getCustomIndex (index, props = this.props) {
        const itemsLength = this._children(props).length;
        if (!itemsLength || (!index && index !== 0)) {
            return 0;
        }
        return IS_RTL ?
            itemsLength - index - 1 :
            index;
    }
    _getFirstItem (index, props = this.props) {
        const itemsLength = this._children(props).length;

        if (index > itemsLength - 1 || index < 0) {
            return 0;
        }

        return index;
    }
    _calcCardPositions (props = this.props) {
        const { itemWidth } = props;

        this._children(props).map((item, index) => {
            const _index = this._getCustomIndex(index, props);
            this._positions[index] = {
                start: _index * itemWidth,
                end: _index * itemWidth + itemWidth
            };
        });
    }
    _initInterpolators (props = this.props) {
        const { firstItem } = props;
        const _firstItem = this._getFirstItem(firstItem, props);
        let interpolators = [];

        this._children(props).map((item, index) => {
            interpolators.push(new Animated.Value(index === _firstItem ? 1 : 0));
        });
        this.setState({ interpolators });
    }
    _getActiveItem (centerX) {
        const { activeSlideOffset } = this.props;

        for (let i = 0; i < this._positions.length; i++) {
            const { start, end } = this._positions[i];
            if (centerX + activeSlideOffset >= start && centerX - activeSlideOffset <= end) {
                return i;
            }
        }
        return 0;
    }
    _getCenterX (event) {
        const { sliderWidth, itemWidth } = this.props;
        const containerSideMargin = (sliderWidth - itemWidth) / 2;

        return event.nativeEvent.contentOffset.x + sliderWidth / 2 - containerSideMargin;
    }
    _onScroll (event) {
        const { animationFunc, animationOptions, enableMomentum, onScrollViewScroll } = this.props;
        const { activeItem } = this.state;
        const newActiveItem = this._getActiveItem(this._getCenterX(event));
        if (enableMomentum) {
            clearTimeout(this._snapNoMomentumTimeout);
        }
        if (onScrollViewScroll) {
            onScrollViewScroll(event);
        }
        if (activeItem !== newActiveItem) {
            Animated[animationFunc](
                this.state.interpolators[activeItem],
                { ...animationOptions, toValue: 0 }
            ).start();
            this.setState({ activeItem: newActiveItem });
            Animated[animationFunc](
                this.state.interpolators[newActiveItem],
                { ...animationOptions, toValue: 1 }
            ).start();
        }
    }
    _onTouchStart () {
        if (this._autoplaying) {
            this.stopAutoplay();
        }
    }
    _onScrollBegin (event) {
        this._scrollStartX = event.nativeEvent.contentOffset.x;
        this._scrollStartActive = this.state.activeItem;
        this._ignoreNextMomentum = false;
    }
    _onScrollEnd (event) {
        const { autoplayDelay, autoplay } = this.props;
        if (this._ignoreNextMomentum) {
            this._ignoreNextMomentum = false;
            return;
        }
        this._scrollEndX = event.nativeEvent.contentOffset.x;
        this._scrollEndActive = this.state.activeItem;
        const deltaX = this._scrollEndX - this._scrollStartX;
        if (this._snapEnabled) {
            this._snapScroll(deltaX);
        }
        if (autoplay) {
            clearTimeout(this._enableAutoplayTimeout);
            this._enableAutoplayTimeout =
                setTimeout(() => {
                    this.startAutoplay(true);
                }, autoplayDelay + 200);
        }
    }
    _onTouchRelease (event) {
        if (this.props.enableMomentum && Platform.OS === 'ios') {
            this._snapNoMomentumTimeout =
                setTimeout(() => {
                    this.snapToItem(this.state.activeItem);
                }, 100);
        }
    }
    _snapScroll (deltaX) {
        const { swipeThreshold } = this.props;
        if (!this._scrollEndActive && this._scrollEndActive !== 0 && Platform.OS === 'ios') {
            this._scrollEndActive = this._scrollStartActive;
        }

        if (this._scrollStartActive !== this._scrollEndActive) {
            this.snapToItem(this._scrollEndActive);
        } else {
            // Snap tergantung deltanya
            if (deltaX > 0) {
                if (deltaX > swipeThreshold) {
                    if (IS_RTL) {
                        this.snapToItem(this._scrollStartActive - 1);
                    } else {
                        this.snapToItem(this._scrollStartActive + 1);
                    }
                } else {
                    this.snapToItem(this._scrollEndActive);
                }
            } else if (deltaX < 0) {
                if (deltaX < -swipeThreshold) {
                    if (IS_RTL) {
                        this.snapToItem(this._scrollStartActive + 1);
                    } else {
                        this.snapToItem(this._scrollStartActive - 1);
                    }
                } else {
                    this.snapToItem(this._scrollEndActive);
                }
            } else {
                // Snap ke item sekarang
                this.snapToItem(this._scrollEndActive);
            }
        }
    }
    startAutoplay (instantly = false) {
        const { autoplayInterval, autoplayDelay } = this.props;
        if (this._autoplaying) {
            return;
        }
        setTimeout(() => {
            this._autoplaying = true;
            this._autoplayInterval =
                setInterval(() => {
                    if (this._autoplaying) {
                        this.snapToNext();
                    }
                }, autoplayInterval);
        }, instantly ? 0 : autoplayDelay);
    }
    stopAutoplay () {
        this._autoplaying = false;
        clearInterval(this._autoplayInterval);
    }
    snapToItem (index, animated = true, fireCallback = true, initial = false) {
        const itemsLength = this._positions.length;
        if (!index) {
            index = 0;
        }
        if (index >= itemsLength) {
            index = itemsLength - 1;
            fireCallback = false;
        } else if (index < 0) {
            index = 0;
            fireCallback = false;
        } else if (index === this.state.oldItemIndex) {
            fireCallback = false;
        }
        const snapX = itemsLength && this._positions[index].start;
        if (this._scrollview) {
            this._scrollview.scrollTo({ x: snapX, y: 0, animated });
            this.props.onSnapToItem && fireCallback && this.props.onSnapToItem(index);
            this.setState({ oldItemIndex: index });
            // iOS Bug :(
            if (!initial && Platform.OS === 'ios') {
                this._ignoreNextMomentum = true;
            }
        }
    }
    snapToNext (animated = true) {
        const itemsLength = this._positions.length;
        let newIndex = this.currentIndex + 1;
        if (newIndex > itemsLength - 1) {
            newIndex = 0;
        }
        this.snapToItem(newIndex, animated);
    }
    snapToPrev (animated = true) {
        const itemsLength = this._positions.length;
        let newIndex = this.currentIndex - 1;
        if (newIndex < 0) {
            newIndex = itemsLength - 1;
        }
        this.snapToItem(newIndex, animated);
    }
    _children (props = this.props) {
        return React.Children.toArray(props.children);
    }
    _childSlides () {
        const { slideStyle, inactiveSlideScale, inactiveSlideOpacity } = this.props;
        if (!this.state.interpolators || !this.state.interpolators.length) {
            return false;
        };
        return this._children().map((child, index) => {
            const animatedValue = this.state.interpolators[index];
            if (!animatedValue) {
                return false;
            }
            return (
              <Animated.View
                key={`carousel-item-${index}`}
                style={[
                    slideStyle,
                    {
                        opacity: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [inactiveSlideOpacity, 1] }),
                        transform: [{
                            scale: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [inactiveSlideScale, 1] })
                        }]
                    }
                ]}>
                    { child }
              </Animated.View>
            );
        });
    }
    render () {
        const {
            sliderWidth,
            itemWidth,
            containerCustomStyle,
            contentContainerCustomStyle,
            enableMomentum,
            carouselHorizontalPadding
        } = this.props;
        const containerSideMargin = carouselHorizontalPadding || (sliderWidth - itemWidth) / 2;
        const style = [
            containerCustomStyle || {},
            // LTR agak di akalin wkwk :D, https://github.com/facebook/react-native/issues/11960
            { flexDirection: IS_RTL ? 'row-reverse' : 'row' }
        ];
        const contentContainerStyle = [
            contentContainerCustomStyle || {},
            { paddingHorizontal: containerSideMargin }
        ];
        return (
            <ScrollView
              decelerationRate={enableMomentum ? 0.9 : 'normal'}
              scrollEventThrottle={100}
              showsHorizontalScrollIndicator={false}
              overScrollMode={'never'}
              {...this.props}
              ref={(scrollview) => { this._scrollview = scrollview; }}
              style={style}
              contentContainerStyle={contentContainerStyle}
              horizontal={true}
              onScrollBeginDrag={this._onScrollBegin}
              onMomentumScrollEnd={enableMomentum ? this._onScrollEnd : undefined}
              onScrollEndDrag={!enableMomentum ? this._onScrollEnd : undefined}
              onResponderRelease={this._onTouchRelease}
              onScroll={this._onScroll}
              onTouchStart={this._onTouchStart}
            >
                { this._childSlides() }
            </ScrollView>
        );
    }
}