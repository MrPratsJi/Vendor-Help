import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Star, 
  TrendingUp, 
  Package,
  Users,
  IndianRupee,
  Edit,
  Eye,
  Clock,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SupplierDashboardProps {
  onBackToHome: () => void;
}

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
  category: string;
  quality: "Premium" | "Standard" | "Economy";
  bulkDiscount: number;
  minBulkQty: number;
}

interface Order {
  id: string;
  vendorName: string;
  products: string[];
  total: number;
  status: "Pending" | "Confirmed" | "Delivered";
  orderTime: string;
  deliveryAddress: string;
}

export const SupplierDashboard = ({ onBackToHome }: SupplierDashboardProps) => {
  const { toast } = useToast();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    unit: "kg",
    stock: "",
    category: "",
    quality: "Standard" as const,
    bulkDiscount: "",
    minBulkQty: ""
  });

  const myProducts: Product[] = [
    {
      id: "1",
      name: "Fresh Tomatoes",
      price: 25,
      unit: "kg", 
      stock: 500,
      category: "Vegetables",
      quality: "Premium",
      bulkDiscount: 10,
      minBulkQty: 50
    },
    {
      id: "2",
      name: "Red Chili Powder",
      price: 180,
      unit: "kg",
      stock: 200,
      category: "Spices",
      quality: "Premium", 
      bulkDiscount: 15,
      minBulkQty: 25
    },
    {
      id: "3",
      name: "Basmati Rice",
      price: 85,
      unit: "kg",
      stock: 1000,
      category: "Grains",
      quality: "Standard",
      bulkDiscount: 12,
      minBulkQty: 100
    },
    {
      id: "4",
      name: "Onions",
      price: 20,
      unit: "kg",
      stock: 800,
      category: "Vegetables",
      quality: "Standard",
      bulkDiscount: 8,
      minBulkQty: 100
    },
    {
      id: "5",
      name: "Turmeric Powder",
      price: 220,
      unit: "kg",
      stock: 150,
      category: "Spices",
      quality: "Premium",
      bulkDiscount: 12,
      minBulkQty: 10
    },
    {
      id: "6",
      name: "Wheat Flour",
      price: 35,
      unit: "kg",
      stock: 2000,
      category: "Grains",
      quality: "Standard",
      bulkDiscount: 15,
      minBulkQty: 200
    },
    {
      id: "7",
      name: "Ginger-Garlic Paste",
      price: 120,
      unit: "kg",
      stock: 80,
      category: "Condiments",
      quality: "Premium",
      bulkDiscount: 10,
      minBulkQty: 20
    }
  ];

  const recentOrders: Order[] = [
    {
      id: "ORD001",
      vendorName: "Raj's Chaat Corner",
      products: ["Fresh Tomatoes (20kg)", "Red Chili Powder (5kg)"],
      total: 1400,
      status: "Pending",
      orderTime: "2 hrs ago",
      deliveryAddress: "Shop 15, FC Road, Pune"
    },
    {
      id: "ORD002", 
      vendorName: "Mumbai Pav Bhaji",
      products: ["Basmati Rice (50kg)"],
      total: 3825,
      status: "Confirmed",
      orderTime: "4 hrs ago",
      deliveryAddress: "Stall 8, Linking Road, Mumbai"
    },
    {
      id: "ORD003",
      vendorName: "Delhi Kulfi House",
      products: ["Fresh Tomatoes (10kg)"],
      total: 225,
      status: "Delivered",
      orderTime: "1 day ago", 
      deliveryAddress: "Shop 3, Connaught Place, Delhi"
    },
    {
      id: "ORD004",
      vendorName: "Bangalore Dosa Point",
      products: ["Onions (30kg)", "Turmeric Powder (2kg)"],
      total: 1040,
      status: "Pending",
      orderTime: "1 hr ago",
      deliveryAddress: "Corner Shop, Brigade Road, Bangalore"
    },
    {
      id: "ORD005",
      vendorName: "Chennai Filter Coffee",
      products: ["Wheat Flour (25kg)"],
      total: 787,
      status: "Confirmed",
      orderTime: "3 hrs ago",
      deliveryAddress: "Shop 7, T.Nagar, Chennai"
    },
    {
      id: "ORD006",
      vendorName: "Kolkata Fish Fry",
      products: ["Ginger-Garlic Paste (5kg)"],
      total: 540,
      status: "Delivered",
      orderTime: "6 hrs ago",
      deliveryAddress: "Stall 12, New Market, Kolkata"
    }
  ];

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added to your inventory`,
    });

    setNewProduct({
      name: "",
      price: "",
      unit: "kg",
      stock: "",
      category: "",
      quality: "Standard",
      bulkDiscount: "",
      minBulkQty: ""
    });
    setShowAddProduct(false);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    toast({
      title: "Order Updated",
      description: `Order ${orderId} marked as ${status.toLowerCase()}`,
    });
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
              <h1 className="text-2xl font-bold text-primary">Supplier Dashboard</h1>
            </div>
            <Button variant="default" onClick={() => setShowAddProduct(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <IndianRupee className="w-8 h-8 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-success">₹45,200</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Products Listed</p>
                  <p className="text-2xl font-bold">{myProducts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Vendors</p>
                  <p className="text-2xl font-bold">127</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold">4.8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Management */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">My Products</h2>
              <Button variant="outline" size="sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>

            {showAddProduct && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Product name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                    <Input
                      placeholder="Category"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    />
                    <Input
                      placeholder="Price per unit"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                    <Input
                      placeholder="Stock quantity"
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    />
                    <Input
                      placeholder="Bulk discount %"
                      type="number"
                      value={newProduct.bulkDiscount}
                      onChange={(e) => setNewProduct({...newProduct, bulkDiscount: e.target.value})}
                    />
                    <Input
                      placeholder="Min bulk quantity"
                      type="number"
                      value={newProduct.minBulkQty}
                      onChange={(e) => setNewProduct({...newProduct, minBulkQty: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddProduct}>Add Product</Button>
                    <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {myProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{product.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                          <Badge 
                            variant={product.quality === "Premium" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {product.quality}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>₹{product.price}/{product.unit}</span>
                          <span>Stock: {product.stock} {product.unit}</span>
                          <span>{product.bulkDiscount}% bulk discount</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Min bulk: {product.minBulkQty} {product.unit}
                      </div>
                      <Badge 
                        variant={product.stock > 100 ? "secondary" : "destructive"}
                        className="text-xs"
                      >
                        {product.stock > 100 ? "In Stock" : "Low Stock"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{order.vendorName}</h4>
                        <p className="text-sm text-muted-foreground">#{order.id}</p>
                      </div>
                      <Badge 
                        variant={
                          order.status === "Delivered" ? "secondary" :
                          order.status === "Confirmed" ? "default" : "outline"
                        }
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-3">
                      {order.products.map((product, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          {product}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold">₹{order.total}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {order.orderTime}
                      </div>
                    </div>

                    {order.status === "Pending" && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => updateOrderStatus(order.id, "Confirmed")}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateOrderStatus(order.id, "Delivered")}
                        >
                          Decline
                        </Button>
                      </div>
                    )}

                    {order.status === "Confirmed" && (
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => updateOrderStatus(order.id, "Delivered")}
                        className="w-full"
                      >
                        Mark as Delivered
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};