import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { FormikProps } from 'formik/dist/types';
import { toast } from 'react-toastify';

import { FormValues } from '../types';
import getStripe from '../utils/getStripe';
import { schema } from '../utils/schema';
import { useStateContext } from '../context/StateContext';
import { CartItem, CheckoutForm } from '../components';
import { Stripe } from '@stripe/stripe-js/types/stripe-js';

const Checkout = () => {
  const { cartItems, totalPrice } = useStateContext();
  const router = useRouter();

  useEffect(() => {
    if (!cartItems || !router) return;

    if (cartItems.length === 0) router.push('/');
  }, [router, cartItems]);

  const onSubmit = async (
    values: FormValues,
    actions: { resetForm: () => void },
  ): Promise<void> => {
    const stripe: Stripe | null = await getStripe();

    const bodyData = {
      ...values,
      cartItems,
    };

    const res: Response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });

    if (res.status === 500) return;

    const data: any = await res.json();

    toast('重新導向...', { type: 'success' });

    actions.resetForm();

    if (stripe) stripe.redirectToCheckout({ sessionId: data.id });
  };

  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      firstname: '',
      lastname: '',
      phoneNum: '',
      email: '',
      country: '',
      city: '',
      street: '',
      postalCode: '',
      packageType: '',
      transportationOps: '',
    },
    validationSchema: schema,
    onSubmit,
  });

  return (
    <main className='flex flex-col md:flex-row justify-center items-center md:items-start gap-[10rem] px-[5rem] md:px-[16rem] py-[5rem]'>
      <CheckoutForm formik={formik} />

      <div className='flex flex-col justify-start w-full md:w-[25%]'>
        <div className='flex flex-col gap-[4rem]'>
          <h3 className='block text-[2.2rem] font-bold text-text-3'>
            你的訂單
          </h3>

          <div className='flex flex-col gap-[4rem] justify-between text-[1.5rem] text-text-3'>
            <div>
              <div className='flex items-center justify-between mb-8'>
                <p className='inline-block'>小計</p>
                <p className='inline-block'>{`$ ${totalPrice}`}</p>
              </div>
              <div className='flex items-center justify-between'>
                <p className='inline-block'>運費</p>
                <p className='inline-block'>$15</p>
              </div>
            </div>

            <div className='flex items-center justify-between text-[2.2rem] font-bold'>
              <p className='inline-block'>總額</p>
              <p className='inline-block'>{`$ ${totalPrice + 15}`}</p>
            </div>
          </div>

          <button
            className='w-full bg-asparagus-3 text-white rounded-[1.5rem] py-[2.5rem] text-[2rem] font-bold mb-[5rem] opacity-90 hover:scale-105 hover:opacity-100 duration-300 ease-in-out'
            type='button'
            onClick={() => formik.handleSubmit()}
          >
            前往結帳頁面
          </button>
        </div>

        {cartItems
          ? cartItems.map((item) => <CartItem item={item} key={item._id} />)
          : null}
      </div>
    </main>
  );
};

export default Checkout;
