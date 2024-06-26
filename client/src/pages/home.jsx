import datas from "@data/features.json";
import Hero from "@components/Hero";
import Features from "@components/Features";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <section className="features">
          <h2 className="sr-only">Features</h2>
          {datas.map((data) => (
            <Features
              key={data.id}
              image={data.image}
              alt={data.alt}
              title={data.title}
              description={data.description}
            />
          ))}
        </section>
      </main>
    </>
  );
}
