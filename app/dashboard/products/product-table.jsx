"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import EditProductForm from "./edit-product-form";
//import { updateMovie, deleteMovie } from "@/lib/actions/movie";
import DeleteMovieDialog from "./delete-product-dialog";
import Image from "next/image";

export default function MovieTable({ movies, onRefresh }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const router = useRouter();
  

  const handleEdit = (movie) => {
    setEditingProduct(movie);
  };

  const handleEditSubmit = async (movie) => {
    // JavaScript ES6 Destructuring
    const { id, name, desc, price, quanty, category_id } = movie;
    setIsSaving(true);
    const productData = {
        name: name,
        desc: desc,
        price: price,
        quanty: quanty,
        category_id: category_id,
        status: 1
      }

    try {
        const resp = await axios.put(
          `http://127.0.0.1:8000/api/products/${id}`, productData,
          {
            withCredentials: true, // for Sanctum
          }
        );
    
        console.log("Update Success:", resp.data.success);

        setIsSaving(false);
        if (resp.data.success) {
        setEditingProduct(null);
          await onRefresh();
        }



      } catch (error) {
        console.error("Update Error:", error.response?.data || error.message);
      }

  };

  const handleDelete = (movie) => {
    setDeletingProduct(movie);
  };

  const handleDeleteConfirm = async (pId) => {
    setDeleting(true);

    try {
        const resp = await axios.delete(
          `http://127.0.0.1:8000/api/products/${pId}`, {
            withCredentials: true, // for Sanctum
          }
        );
    
        setDeleting(false);

        if (resp.data.success) {
            setDeletingProduct(null);
            await onRefresh();
        }

      } catch (error) {
        console.error("Update Error:", error.response?.data || error.message);
      }

  };

  return ( 
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold"># Image</TableHead>
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Descp</TableHead>
            <TableHead className="font-bold">Price</TableHead>
            <TableHead className="font-bold">Quantity</TableHead>
            <TableHead className="font-bold">Category</TableHead>
            <TableHead className="font-bold text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie.id}>
              <TableCell>
                 

              </TableCell>
              <TableCell>{movie?.name ?? "N/A"}</TableCell>
              <TableCell>{movie?.desc ?? "N/A"}</TableCell>
              <TableCell>{movie?.price ?? "N/A"}</TableCell>
              <TableCell>{movie?.quanty ?? "N/A"}</TableCell>
              <TableCell>{movie?.category_id?? "N/A"}</TableCell>
              <TableCell>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="min-w-[120px]"
                    onClick={() => handleEdit(movie)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="min-w-[120px]"
                    onClick={() => handleDelete(movie)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          open={true}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditingProduct(null)}
          isLoading={isSaving}
        />
      )}
      {deletingProduct && (
        <DeleteMovieDialog
          product={deletingProduct}
          open={true}
          onCancel={() => setDeletingProduct(null)}
          onConfirm={() => handleDeleteConfirm(deletingProduct?.id)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}
