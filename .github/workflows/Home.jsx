import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <section className="hero">
        <div className="hero-content">

          <h1>Welcome to Our Cafe ☕</h1>

          <p>
            Fresh coffee, delicious food,
            and a relaxing place for everyone.
          </p>

          <Link to="/menu" className="btn">
            Order Now
          </Link>

        </div>
      </section>

      <section className="about">
        <h2>About Our Cafe</h2>

        <p>
          We provide fresh coffee, tea, cakes,
          and delicious food for our customers.
        </p>
      </section>

    </div>
  );
}

export default Home;