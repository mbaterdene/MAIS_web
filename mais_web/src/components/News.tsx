"use client"

import { useQuery } from '@tanstack/react-query';
import { useState } from "react"
import { Grid, Pagination, Stack } from "@mui/material"
import BlogCard from "./ui/BlogCard";
import { AnimatedBackground } from "./ui/animatedbg";

export default function BlogsPage() {

  const {data:blogs} = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/blogs/fetch");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch blogs");
      return data;
    },
    retry: 1,
  });
  
  const Blogs = blogs?.data;

  console.log("Blogs data:", Blogs);
  const [visibleBlogs, setVisibleBlogs] = useState(12);

  const handleLoadMore = () => {
    setVisibleBlogs((prevNum: number) => prevNum + 12);
  };

  let displayedBlogs = [];


  if(Blogs){
    displayedBlogs = [...Blogs].slice(0, visibleBlogs);
  }
  
  const categories = [
    "All",
    "Study Tips",
    "Productivity",
    "Study Skills",
    "Mental Health",
    "Technology",
    "Others"
  ]

  return (
    <>
      <div className="flex flex-col min-h-screen container mx-auto px-4 py-8 max-w-4xl">
        <main className="space-y-8">
          <h1 className="text-4xl font-bold mb-6">
            All News
          </h1>
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-300 pb-4">
            <AnimatedBackground
              defaultValue='All'
              className='rounded-lg bg-gray-300 dark:bg-zinc-700'
              transition={{
                ease: 'easeInOut',
                duration: 0.2,
              }}
            >
              {categories.map((label, index) => {
                return (
                  <button
                    key={index}
                    data-id={label}
                    type='button'
                    aria-label={`${label} view`}
                    className='inline-flex px-4 py-2 rounded-full items-center bg-gray-100 justify-center text-center text-zinc-800 transition-transform active:scale-[0.98] dark:text-zinc-50'
                  >
                    {label}
                  </button>
                );
              })}
            </AnimatedBackground>
            {/*categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm ${
                  index === 0 ? "bg-blue-100 text-blue-800" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))*/}
          </div>
          {Blogs && (
                <Grid container columnSpacing={4} rowSpacing={2} columns={12} >
                  {displayedBlogs.map((blog) => (
                  <Grid 
                    size={{ xs: 12, sm: 4 }}
                    key={blog._id}
                    className="mx-auto"
                  >
                    <BlogCard blog={blog} isPreview={false} />
                  </Grid>
                  ))}
                </Grid>
          )}
          {Blogs && displayedBlogs.length < Blogs.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleLoadMore}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Load More
              </button>
            </div>
          )}
        </main>
        <div className='flex w-full mt-auto'>
          <Stack spacing={2} className='flex w-full' sx={{ width: '100%', alignItems: 'center' }}>
            <Pagination count={10} variant="outlined" shape="rounded" size='large'/>
          </Stack>
        </div>
      </div>
    </>
  )
}