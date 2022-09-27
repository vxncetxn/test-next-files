import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getStaticPaths() {
  let { data: users, error } = await supabase.from("user").select("handle");

  const paths = users.map((user) => {
    return {
      params: user,
    };
  });

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  let { data, error } = await supabase
    .from("user")
    .select(
      `
      images (
        path
      )
    `
    )
    .eq("handle", context.params.handle);

  return {
    // Passed to the page component as props
    props: { handle: context.params.handle, images: data[0].images },
    revalidate: 1,
  };
}

export default function Galleries({ handle, images }) {
  console.log(handle, images);

  return (
    <div>
      <ul>
        {images.map((image) => (
          <li>
            {/* <img src={`/images/${handle}/${image.path}`} /> */}
            <img
              src={`https://test-next-files-53qe.vercel.app/api/images-new/${handle}/${image.path}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
