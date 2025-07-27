import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Star, 
  MapPin, 
  Clock, 
  TrendingDown,
  Users,
  ShoppingCart,
  Truck,
  Filter,
  Bell,
  Phone,
  ArrowLeft,
  Minus,
  Plus
} from "lucide-react";
import { PaymentModal } from "./payment-modal";
import { useToast } from "@/hooks/use-toast";

interface VendorDashboardProps {
  onBackToHome: () => void;
}

interface Supplier {
  id: string;
  name: string;
  rating: number;
  distance: string;
  priceRange: string;
  specialties: string[];
  bulkDiscount: number;
  deliveryTime: string;
  verified: boolean;
  orders: number;
  phone: string;
  address: string;
}

interface Product {
  id: string;
  name: string;
  supplier: string;
  price: number;
  unit: string;
  discount?: number;
  quality: "Premium" | "Standard" | "Economy";
  availability: "In Stock" | "Limited" | "Out of Stock";
  minQuantity: number;
  supplierId: string;
}

export const VendorDashboard = ({ onBackToHome }: VendorDashboardProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<{productId: string, quantity: number}[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [showSupplierProducts, setShowSupplierProducts] = useState(false);

  const nearbySuppliers: Supplier[] = [
    {
      id: "1",
      name: "Sharma Wholesale Market",
      rating: 4.8,
      distance: "1.2 km",
      priceRange: "₹₹",
      specialties: ["Vegetables", "Spices", "Grains"],
      bulkDiscount: 15,
      deliveryTime: "30 min",
      verified: true,
      orders: 150,
      phone: "+91 98765 43210",
      address: "Shop 12, Wholesale Market, Pune"
    },
    {
      id: "2", 
      name: "Fresh Valley Supplies",
      rating: 4.6,
      distance: "2.1 km",
      priceRange: "₹₹₹",
      specialties: ["Organic Vegetables", "Fruits"],
      bulkDiscount: 12,
      deliveryTime: "45 min",
      verified: true,
      orders: 89,
      phone: "+91 98765 43211",
      address: "Plot 5, Agricultural Market, Mumbai"
    },
    {
      id: "3",
      name: "Mumbai Spice Hub",
      rating: 4.9,
      distance: "0.8 km", 
      priceRange: "₹₹",
      specialties: ["Spices", "Masalas", "Oil"],
      bulkDiscount: 20,
      deliveryTime: "20 min",
      verified: true,
      orders: 200,
      phone: "+91 98765 43212",
      address: "Lane 3, Spice Market, Mumbai"
    },
    {
      id: "4",
      name: "Delhi Fresh Mart",
      rating: 4.7,
      distance: "1.8 km",
      priceRange: "₹₹",
      specialties: ["Dairy", "Vegetables", "Snacks"],
      bulkDiscount: 18,
      deliveryTime: "40 min",
      verified: true,
      orders: 120,
      phone: "+91 98765 43213",
      address: "Block A, Delhi Mandi, Delhi"
    },
    {
      id: "5",
      name: "Bangalore Organic Co.",
      rating: 4.5,
      distance: "3.2 km",
      priceRange: "₹₹₹",
      specialties: ["Organic Grains", "Pulses", "Oil"],
      bulkDiscount: 10,
      deliveryTime: "60 min",
      verified: true,
      orders: 75,
      phone: "+91 98765 43214",
      address: "Organic Plaza, Bangalore"
    },
    {
      id: "6",
      name: "Chennai Masala Corner",
      rating: 4.4,
      distance: "2.5 km",
      priceRange: "₹₹",
      specialties: ["South Indian Spices", "Rice", "Coconut"],
      bulkDiscount: 16,
      deliveryTime: "35 min",
      verified: true,
      orders: 95,
      phone: "+91 98765 43215",
      address: "T.Nagar Market, Chennai"
    }
  ];

  const featuredProducts: Product[] = [
    {
      id: "1",
      name: "Fresh Tomatoes",
      supplier: "Sharma Wholesale Market",
      price: 25,
      unit: "kg",
      discount: 10,
      quality: "Premium",
      availability: "In Stock",
      minQuantity: 5,
      supplierId: "1"
    },
    {
      id: "2",
      name: "Red Chili Powder",
      supplier: "Mumbai Spice Hub", 
      price: 180,
      unit: "kg",
      discount: 15,
      quality: "Premium",
      availability: "In Stock",
      minQuantity: 2,
      supplierId: "3"
    },
    {
      id: "3",
      name: "Basmati Rice",
      supplier: "Fresh Valley Supplies",
      price: 85,
      unit: "kg",
      quality: "Standard",
      availability: "Limited",
      minQuantity: 10,
      supplierId: "2"
    },
    {
      id: "4",
      name: "Onions",
      supplier: "Sharma Wholesale Market",
      price: 20,
      unit: "kg",
      discount: 8,
      quality: "Standard",
      availability: "In Stock",
      minQuantity: 10,
      supplierId: "1"
    },
    {
      id: "5",
      name: "Turmeric Powder",
      supplier: "Mumbai Spice Hub",
      price: 220,
      unit: "kg",
      discount: 12,
      quality: "Premium",
      availability: "In Stock",
      minQuantity: 1,
      supplierId: "3"
    },
    {
      id: "6",
      name: "Cooking Oil",
      supplier: "Delhi Fresh Mart",
      price: 150,
      unit: "litre",
      discount: 5,
      quality: "Standard",
      availability: "In Stock",
      minQuantity: 5,
      supplierId: "4"
    },
    {
      id: "7",
      name: "Potatoes",
      supplier: "Sharma Wholesale Market",
      price: 18,
      unit: "kg",
      quality: "Economy",
      availability: "In Stock",
      minQuantity: 15,
      supplierId: "1"
    },
    {
      id: "8",
      name: "Garam Masala",
      supplier: "Chennai Masala Corner",
      price: 320,
      unit: "kg",
      discount: 10,
      quality: "Premium",
      availability: "Limited",
      minQuantity: 1,
      supplierId: "6"
    }
  ];

  const addToCart = (productId: string) => {
    const existingItem = cart.find(item => item.productId === productId);
    const product = featuredProducts.find(p => p.id === productId);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.productId === productId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { productId, quantity: product?.minQuantity || 1 }]);
    }
    
    toast({
      title: "Added to Cart",
      description: "Product added to bulk order group",
    });
  };

  const joinBulkOrder = (supplierId: string) => {
    const supplier = nearbySuppliers.find(s => s.id === supplierId);
    toast({
      title: "Joined Bulk Order",
      description: `You'll save ${supplier?.bulkDiscount || 15}% when the group reaches minimum quantity`,
    });
  };

  const viewSupplierProducts = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setShowSupplierProducts(true);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = featuredProducts.find(p => p.id === item.productId);
      if (product) {
        const discountedPrice = product.discount 
          ? product.price * (1 - product.discount / 100)
          : product.price;
        return total + (discountedPrice * item.quantity);
      }
      return total;
    }, 0);
  };

  const getCartItems = () => {
    return cart.map(item => {
      const product = featuredProducts.find(p => p.id === item.productId);
      return product ? `${product.name} (${item.quantity} ${product.unit})` : '';
    }).filter(Boolean);
  };

  const proceedToPayment = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Please add items to cart before checkout",
        variant: "destructive"
      });
      return;
    }
    setShowPaymentModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBackToHome}>
                ← Back
              </Button>
              <h1 className="text-2xl font-bold text-primary">Vendor Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <Badge variant="secondary">{cart.length} items</Badge>
              <Button variant="vendor" onClick={proceedToPayment}>
                ₹{Math.round(getCartTotal())} Checkout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-8 h-8 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Savings</p>
                  <p className="text-2xl font-bold text-success">₹12,500</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Bulk Groups</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Trust Score</p>
                  <p className="text-2xl font-bold">4.9</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Truck className="w-8 h-8 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Orders</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers or products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Nearby Suppliers */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-6">Nearby Trusted Suppliers</h2>
            <div className="space-y-4">
              {nearbySuppliers.map((supplier) => (
                <Card key={supplier.id} className="hover:shadow-card transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{supplier.name}</h3>
                          {supplier.verified && (
                            <Badge variant="secondary" className="text-xs">Verified</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-warning text-warning" />
                            <span>{supplier.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{supplier.distance}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{supplier.deliveryTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-success">
                          {supplier.bulkDiscount}% OFF
                        </div>
                        <div className="text-xs text-muted-foreground">bulk orders</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {supplier.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => joinBulkOrder(supplier.id)}
                      >
                        Join Bulk Order
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => viewSupplierProducts(supplier)}
                      >
                        View Products
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Featured Products */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Today's Best Deals</h2>
            <div className="space-y-4">
              {featuredProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">{product.supplier}</p>
                      </div>
                      <Badge 
                        variant={product.availability === "In Stock" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {product.availability}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">₹{product.price}</span>
                        <span className="text-sm text-muted-foreground">/{product.unit}</span>
                        {product.discount && (
                          <Badge variant="destructive" className="text-xs">
                            {product.discount}% OFF
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.quality}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          const currentItem = cart.find(item => item.productId === product.id);
                          if (currentItem && currentItem.quantity > 1) {
                            setCart(cart.map(item => 
                              item.productId === product.id 
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                            ));
                          } else if (currentItem) {
                            setCart(cart.filter(item => item.productId !== product.id));
                          }
                        }}
                        disabled={!cart.find(item => item.productId === product.id)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="min-w-[2rem] text-center">
                        {cart.find(item => item.productId === product.id)?.quantity || 0}
                      </span>
                      <Button 
                        size="sm" 
                        onClick={() => addToCart(product.id)}
                        disabled={product.availability === "Out of Stock"}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Min: {product.minQuantity} {product.unit}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        orderTotal={Math.round(getCartTotal())}
        orderDetails={{
          items: getCartItems(),
          vendorName: "RastalConnect Order"
        }}
      />

      {/* Supplier Products Modal */}
      {showSupplierProducts && selectedSupplier && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" onClick={() => setShowSupplierProducts(false)}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h2 className="text-xl font-semibold">{selectedSupplier.name}</h2>
                  <p className="text-muted-foreground">{selectedSupplier.address}</p>
                </div>
              </div>
              
              <div className="grid gap-4">
                {featuredProducts
                  .filter(product => product.supplierId === selectedSupplier.id)
                  .map(product => (
                    <Card key={product.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-lg font-bold">₹{product.price}</span>
                              <span className="text-sm text-muted-foreground">/{product.unit}</span>
                              {product.discount && (
                                <Badge variant="destructive" className="text-xs">
                                  {product.discount}% OFF
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">Min: {product.minQuantity} {product.unit}</p>
                          </div>
                          <Button onClick={() => addToCart(product.id)}>
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};