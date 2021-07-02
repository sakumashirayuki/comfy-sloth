import React from "react";
import { useProductsContext } from "../context/products_context";
import { Link } from "react-router-dom";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";

const FeaturedProducts = () => {
  const {
    productsLoading: loading,
    productsError: error,
    featuredProducts: featured,
  } = useProductsContext();
  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center carousel">
        <button className="trans-btn">
            <BsCaretLeftFill />
        </button>
        <div className="featured">
          {featured.slice(0, 3).map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
        <button className="trans-btn">
            <BsCaretRightFill />
        </button>
      </div>
      <Link to="/products" className="btn">
        all products
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .carousel {
    display: flex;
  }
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  }
`;

export default FeaturedProducts;
