"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { getCategories } from "@/lib/apis/catgry";

export default function EditProductForm({
  product,
  open,
  onSubmit,
  onCancel,
  isLoading,
}) {

    console.log('product',product);
    
  const [name, setName] = useState(product?.name);
  const [desc, setDesc] = useState(product?.desc);
  const [price, setPrice] = useState(product?.price);
  const [quanty, setQuanty] = useState(product?.quanty);
  const [category, setCatgry] = useState(product?.category_id);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  const getCategoryName = (id) => {
    const found = categories.find((cat) => cat.id === id);
    return found ? found.catgry : "Select a category";
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    // Save the updated product to the database
    onSubmit({
      ...product,
      name,
      desc,
      price,
      quanty,
      category
    });
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-800">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Update the selected product</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmitForm}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the product name"
              />
            </div>

            <div>
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              name="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Enter the description"
            />
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Enter the Price"
            />
          </div>

          <div>
            <Label htmlFor="quanty">Quantity</Label>
            <Input
              id="quanty"
              name="quanty"
              type="number"
              value={quanty}
              onChange={(e) => setQuanty(Number(e.target.value))}
              placeholder="Enter the quantity"
            />
          </div>


          <div>
            <Label htmlFor="category">Category</Label>
            <Select
                value={category ? String(category) : ""}
                onValueChange={(val) => setCatgry(parseInt(val, 10))}
            >
                <SelectTrigger>
                <SelectValue placeholder={getCategoryName(category)} />
                </SelectTrigger>
                <SelectContent>
                {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.catgry}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>


            

        
            <div className="w-full flex justify-end space-x-2">
              <Button type="reset" variant="outline">
                Clear Form
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin" />} Edit Product
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
