import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoryContext } from '../../context/categories.context';

import './category.styles.scss';

const Category = () => {
  const { category } = useParams();
  console.log(category);
  const { categoriesMap } = useContext(CategoryContext);
  const [products, setProducts] = useState(categoriesMap[category]);
  

  useEffect(() => {
    console.log(categoriesMap[category],"categoriesMap[category]")
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      <div className='category-container'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;