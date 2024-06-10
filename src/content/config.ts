import { z, defineCollection } from "astro:content";

// const blogsCollection = defineCollection({
//   type: "content",
//   schema: ({ image }) =>
//     z.object({
//       title: z.string(),
//       image: image().optional(),
//       tags: z.array(z.string()),
//       author: z.array(z.object({ name: z.string(), url: z.string() })),
//       date: z.date(),
//     }),
// });

const projectsCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      links: z
        .object({
          github: z.string().optional(),
          demo: z.string().optional(),
        })
        .strict(),
      image: image(),
      date: z.string().transform((date) => new Date(date)),
      featured: z.boolean(),
    }),
});

export const collections = {
  projects: projectsCollection,
};
