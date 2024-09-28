"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RecipeSearch() {
  interface Recipe {
    title: string;
    ingredients: string;
    servings: number;
    instructions: string;
  }

  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  const handleSearchBtn = async () => {
    setLoading(true);
    setError(null);
    setRecipes(null);

    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/recipe?query=${input}`,
        {
          headers: {
            "X-Api-Key": "lKtqOcitXKlPdf5kvf1ysg==AguhIHwYblypgdyF",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data: Recipe[] = await response.json();
      setRecipes(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-950">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Recipe Search</CardTitle>
          <CardDescription>
            Example: enter 'salad' and get amazing recipes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="search flex gap-2">
            <Input
              placeholder="Type here..."
              id="input"
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <Button onClick={handleSearchBtn}>Search</Button>
          </div>
        </CardContent>
        <CardFooter>
          {loading && (
            <div className="loading w-full text-center">
              <h1>Loading...</h1>
            </div>
          )}
          {error && (
            <div className="error text-red-600">
              {error}
            </div>
          )}
          {recipes && recipes.length > 0 && (
            <div className="recipes mt-4">
              {recipes.map((recipe, index) => (
                <div key={index} className="recipe mb-4">
                  <h2 className="font-bold">{recipe.title}</h2>
                  <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                  <p><strong>Servings:</strong> {recipe.servings}</p>
                  <p><strong>Instructions:</strong> {recipe.instructions}</p>
                </div>
              ))}
            </div>
          )}
          {recipes && recipes.length === 0 && (
            <div className="no-results mt-4 text-center">
              <h2>No recipes found.</h2>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

