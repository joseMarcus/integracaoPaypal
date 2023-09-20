import React, { useState, useRef, useEffect } from 'react';
import gif from '../image/giphy.gif';
import { useParams } from 'react-router-dom';

function Product({ products }) {
  const { productId } = useParams();
  const parsedProductId = parseInt(productId);
  const product = products.find((p) => p.id === parsedProductId);


  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const paypalRef = useRef();

  useEffect(() => {
    if (!product) {
      console.error('Produto não encontrado');
      return;
    }

    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  currency_code: 'BRL',
                  value: product.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onError: (err) => {
          setError(err);
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [product]);

  

  

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  if (paidFor) {
    return (    
    <main className='paypal-form2'>
        <div className='desc2'>
        <h1>Parabéns, você comprou a {product.name}!</h1>
        <img alt={product.description} src={gif} />
        <a href="/"> Clique aqui para voltar</a>
      </div>
      
    </main>
    );
  }
  
  
  

  return (
    <main className='paypal-form'>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <section className='descricaoItem'>
        <div className='desc1'>
          <h1>
            {product.name}
          </h1>
          <img alt={product.description} src={product.image} width="500" />
        </div>
        <div className='desc2'>
          <h1><span>Por apenas: </span>R$ {product.price}</h1>
          <p>{product.description} </p>   
            <h2>Dados Pessoais e Bancários</h2>
        
           
            
            <div ref={paypalRef} />
          
            </div>
        
      </section>
      
    </main>
  );
}

export default Product;