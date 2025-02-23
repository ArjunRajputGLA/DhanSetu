import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, ChevronLeft, ChevronRight, Sparkles, Check, Tag } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CouponCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [copiedCoupons, setCopiedCoupons] = useState(new Set());
  const [copyStates, setCopyStates] = useState({});
  const { toast } = useToast();

  // Enhanced coupons data with more visual attributes
  const coupons = [
    {
      id: 1,
      title: "Premium Access",
      discount: "50% OFF",
      code: "PREMIUM50",
      validUntil: "2025-02-01",
      description: "Get 50% off on your first premium subscription",
      category: "Subscription",
      backgroundColor: "from-blue-500 to-purple-500",
      accentColor: "bg-blue-400"
    },
    {
      id: 2,
      title: "AI Assistant Plus",
      discount: "30% OFF",
      code: "AI30PLUS",
      validUntil: "2025-02-15",
      description: "Special discount on AI Assistant Plus features",
      category: "AI Tools",
      backgroundColor: "from-emerald-500 to-teal-500",
      accentColor: "bg-emerald-400"
    },
    {
      id: 3,
      title: "Learning Bundle",
      discount: "25% OFF",
      code: "LEARN25",
      validUntil: "2025-02-28",
      description: "Save on our comprehensive learning packages",
      category: "Education",
      backgroundColor: "from-orange-500 to-red-500",
      accentColor: "bg-orange-400"
    },
    {
      id: 4,
      title: "Trading Pro",
      discount: "40% OFF",
      code: "TRADE40",
      validUntil: "2025-03-15",
      description: "Access advanced trading features and analytics",
      category: "Trading",
      backgroundColor: "from-indigo-500 to-purple-500",
      accentColor: "bg-indigo-400"
    },
    {
      id: 5,
      title: "New Year Special",
      discount: "45% OFF",
      code: "NEWYEAR45",
      validUntil: "2025-01-31",
      description: "Exclusive discount for the new year celebration",
      category: "Special",
      backgroundColor: "from-pink-500 to-rose-500",
      accentColor: "bg-pink-400"
    },
    {
      id: 6,
      title: "Portfolio Analysis",
      discount: "35% OFF",
      code: "PORTFOLIO35",
      validUntil: "2025-03-01",
      description: "Deep dive into your portfolio with AI insights",
      category: "Analysis",
      backgroundColor: "from-cyan-500 to-blue-500",
      accentColor: "bg-cyan-400"
    }
  ];

  useEffect(() => {
    const resetTimer = setInterval(() => {
      setCopiedCoupons(new Set());
      setCopyStates({});
    }, 3600000);

    return () => clearInterval(resetTimer);
  }, []);

  const copyCode = async (coupon) => {
    try {
      setCopyStates(prev => ({ ...prev, [coupon.id]: 'loading' }));
      await navigator.clipboard.writeText(coupon.code);
      setCopiedCoupons(prev => new Set(prev).add(coupon.id));
      setCopyStates(prev => ({ ...prev, [coupon.id]: 'success' }));
      
      toast({
        title: (
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span>Code Copied Successfully!</span>
          </div>
        ),
        description: (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Use code <span className="font-mono font-bold">{coupon.code}</span> to get {coupon.discount}
            </p>
            <p className="text-xs text-gray-500">Valid until {coupon.validUntil}</p>
          </div>
        ),
        duration: 3000
      });

      setTimeout(() => {
        setCopyStates(prev => ({ ...prev, [coupon.id]: null }));
      }, 2000);
    } catch (error) {
      console.error(error);
      setCopyStates(prev => ({ ...prev, [coupon.id]: 'error' }));
      toast({
        title: "Failed to copy code",
        description: "Please try copying the code manually",
        variant: "destructive",
        duration: 3000
      });

      setTimeout(() => {
        setCopyStates(prev => ({ ...prev, [coupon.id]: null }));
      }, 2000);
    }
  };

  const getButtonContent = (coupon) => {
    const state = copyStates[coupon.id];
    switch (state) {
      case 'loading':
        return <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" />;
      case 'success':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'error':
        return <Copy className="w-5 h-5 text-red-600" />;
      default:
        return <Copy className="w-5 h-5" />;
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === coupons.length - 1 ? 0 : prevIndex + 1
    );
  }, [coupons.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? coupons.length - 1 : prevIndex - 1
    );
  }, [coupons.length]);

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(nextSlide, 4000);
      return () => clearInterval(timer);
    }
  }, [nextSlide, isHovered]);

  const getCardStyles = (index) => {
    const position = (index - currentIndex + coupons.length) % coupons.length;
    const isActive = position === 0;
    const isPrev = position === coupons.length - 1;
    const isNext = position === 1;
    
    let transform = 'scale(0.7) translateX(0%) translateY(5%)';
    let zIndex = 0;
    let opacity = 0;
    let filter = 'blur(8px)';
    
    if (isActive) {
      transform = 'scale(1) translateX(0%) translateY(0%)';
      zIndex = 3;
      opacity = 1;
      filter = 'blur(0px)';
    } else if (isPrev) {
      transform = 'scale(0.85) translateX(75%) translateY(2%)';
      zIndex = 2;
      opacity = 0.7;
      filter = 'blur(2px)';
    } else if (isNext) {
      transform = 'scale(0.85) translateX(-75%) translateY(2%)';
      zIndex = 2;
      opacity = 0.7;
      filter = 'blur(2px)';
    }

    return {
      transform,
      zIndex,
      opacity,
      filter
    };
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-4">
          <Tag className="w-4 h-4" />
          <span className="text-sm font-medium">Limited Time Offers</span>
        </div>
        <h2 className="text-6xl font-extrabold">
          <span className="bg-clip-text text-transparent bg-[linear-gradient(50deg,#4F46E5,#EC4899,#8B5CF6,#3B82F6,#06B6D4,#9333EA,#DC2626)] animate-gradient bg-[length:400%_400%]">
            Special Offers
          </span>
        </h2> 
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Exclusive deals curated just for you. Don&apos;t miss out on these amazing discounts!
        </p>
      </div>

      <div 
        className="relative h-[550px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button 
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:text-blue-600 transition-colors" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        >
          <ChevronRight className="w-6 h-6 group-hover:text-blue-600 transition-colors" />
        </button>

        <div className="relative h-full overflow-hidden rounded-xl">
          {coupons.map((coupon, index) => {
            const styles = getCardStyles(index);
            return (
              <div
                key={coupon.id}
                className="absolute top-0 left-0 w-full h-full transition-all duration-700 ease-out"
                style={{
                  transform: styles.transform,
                  zIndex: styles.zIndex,
                  opacity: styles.opacity,
                  filter: styles.filter
                }}
              >
                <Card className="h-full shadow-2xl">
                  <CardContent className="p-8 h-full">
                    <div 
                      className={`bg-gradient-to-r ${coupon.backgroundColor} rounded-xl p-8 text-white h-full relative overflow-hidden group`}
                    >
                      {/* Enhanced animated background pattern */}
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:400%_400%] animate-gradient opacity-50" />
                      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
                      
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${coupon.accentColor} animate-pulse`} />
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                            {coupon.category}
                          </span>
                        </div>
                        <div className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full font-medium">
                          Valid until {coupon.validUntil}
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <div className="text-4xl font-bold mb-2 tracking-tight">{coupon.title}</div>
                          <div className="text-7xl font-black mb-4 tracking-tight">{coupon.discount}</div>
                        </div>
                        
                        <div className="text-lg opacity-90">{coupon.description}</div>
                        
                        <div className="flex items-center gap-4 pt-4">
                          <div className="relative group/code bg-white/10 backdrop-blur-sm text-white py-4 px-6 rounded-xl font-mono text-xl flex-grow text-center border border-white/20 hover:bg-white/20 transition-colors">
                            {coupon.code}
                            {copiedCoupons.has(coupon.id) && (
                              <span className="absolute -top-2 -right-2">
                                <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                              </span>
                            )}
                          </div>
                          <Button 
                            onClick={() => copyCode(coupon)}
                            disabled={copyStates[coupon.id] === 'loading'}
                            className={`relative bg-white text-gray-800 hover:bg-gray-100 transition-all duration-300 hover:scale-105 p-6 rounded-xl ${
                              copiedCoupons.has(coupon.id) ? 'bg-green-50' : ''
                            }`}
                          >
                            {getButtonContent(coupon)}
                            {copiedCoupons.has(coupon.id) && (
                              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-3 z-20">
          {coupons.map((_, index) => (
            <button
              key={index}
              className={`h-3 transition-all duration-500 rounded-full ${
                index === currentIndex 
                  ? 'w-12 bg-gradient-to-r from-blue-500 to-purple-500' 
                  : 'w-3 bg-gray-300 hover:bg-blue-300 hover:scale-110'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CouponCarousel;