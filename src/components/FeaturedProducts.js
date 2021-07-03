import React, { useState, useEffect } from "react";
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

  const [beginIndex, setBeginIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const n = featured.length;

  const prevPage = () => {
    setBeginIndex((prevIndex)=>{
      return (prevIndex + 3) % n;
    });
  }

  const nextPage = () => {
    setBeginIndex((prevIndex)=>{
      return (prevIndex - 3 + n) % n;
    });
  }

  useEffect(()=>{
    if(seconds===5){
      nextPage();
      setSeconds(0);
    }
    let interval = null;
    interval = setInterval(()=>{
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds])
  
  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center carousel">
        <button className="trans-btn" onClick={prevPage}>
            <BsCaretLeftFill />
        </button>
        <div className="featured">
          {featured.slice(beginIndex, beginIndex + 3).map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
        <button className="trans-btn" onClick={nextPage}>
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
      object-fit: cover;
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
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }
  }
`;

export default FeaturedProducts;
