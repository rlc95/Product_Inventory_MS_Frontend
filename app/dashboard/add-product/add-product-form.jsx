"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getCategories } from "@/lib/apis/catgry";

// client component
export default function AddProductForm() {
  const [isLoading, setLoading] = useState("");
  const { toast } = useToast();
  const [catgry, setCatgry] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);


  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("pname")?.toString();
    const descp = formData.get("descp")?.toString();
    const price = Number(formData.get("Price"));
    const quant = Number(formData.get("quant"));

    if (name && price && quant && catgry) {
      setLoading(true);
      
      const productData = {
        name: name,
        desc: descp,
        price: price,
        quanty: quant,
        category_id: catgry,
        status: 1
      }
  
      const resp = await axios.post('http://127.0.0.1:8000/api/products',  productData, {
        withCredentials: true, // important for Sanctum
      });

      console.log("res",resp.data.success);
      
      setLoading(false);
      if (resp.data.success) {
        toast({
          variant: "success",
          title: "Product Added Successfully!",
          description: "Product was added to database.",
        });
      }
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add Product</CardTitle>
        <CardDescription>Add a product to database.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmitForm}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="pname">Product Name</Label>
            <Input
              id="pname"
              name="pname"
              placeholder="Enter the product name]"
            />
          </div>

          <div>
            <Label htmlFor="descp">Description</Label>
            <Textarea
              id="descp"
              name="descp"
              placeholder="Enter the description"
            />
          </div>

          <div>
            <Label htmlFor="Price">Price</Label>
            <Input
              id="Price"
              name="Price"
              type="number"
              placeholder="Enter the Price"
            />
          </div>

          <div>
            <Label htmlFor="quant">Quantity</Label>
            <Input
              id="quant"
              name="quant"
              type="number"
              placeholder="Enter the quantity"
            />
          </div>


          <div>
            <Label htmlFor="catgry">Category</Label>
            <Select onValueChange={(val) => setCatgry(parseInt(val, 10))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a rating" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat['id']} value={String(cat.id)}>
                    {cat['catgry']}
                  </SelectItem>
                ))}
                
              </SelectContent>
            </Select>
          </div>

        </CardContent>

        <CardFooter className="w-full flex justify-end space-x-2">
          <Button type="reset" variant="outline">
            Clear Form
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />} Add Product
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
