import React from 'react';
import { FormikProps } from 'formik/dist/types';
import { FormValues } from '../types';
import { cities } from '../utils/data';

interface Props {
  formik: FormikProps<FormValues>;
}

const CheckoutForm = ({ formik }: Props) => {
  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <form
      className='flex flex-col justify-start gap-[5rem] w-full md:w-[85rem] mb-[5rem]'
      noValidate
    >
      <div>
        <h1 className='text-[4rem] font-bold text-heading-1'>結帳</h1>
      </div>

      {/* 個人資訊 */}
      <div className='flex flex-col justify-between gap-[3rem]'>
        <div>
          <h2 className='text-[2rem] font-medium text-text-3'>個人資訊</h2>
        </div>

        <div className='flex gap-[4.5rem] w-full'>
          <div className='flex flex-col w-full'>
            <label className='block text-text-2'>姓</label>
            <input
              className='rounded-[1.2rem] w-full h-[5.3rem] border-light-brown border-2 px-[2rem]'
              id='firstname'
              type='text'
              value={values.firstname}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <p className='text-red-400'>
              {errors.firstname && touched?.firstname ? errors.firstname : ''}
            </p>
          </div>
          <div className='flex flex-col w-full'>
            <label className='block text-text-2'>名</label>
            <input
              className='rounded-[1.2rem] w-full h-[5.3rem] border-light-brown border-2 px-[2rem]'
              id='lastname'
              type='text'
              value={values.lastname}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <p className='text-red-400'>
              {errors.lastname && touched?.lastname ? errors.lastname : ''}
            </p>
          </div>
        </div>

        <div className='flex gap-[4.5rem] w-full'>
          <div className='flex flex-col w-full'>
            <label className='block text-text-2'>手機號碼</label>
            <input
              className='rounded-[1.2rem] w-full h-[5.3rem] border-light-brown border-2 px-[2rem]'
              id='phoneNum'
              type='text'
              value={values.phoneNum}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <p className='text-red-400'>
              {errors.phoneNum && touched?.phoneNum ? errors.phoneNum : ''}
            </p>
          </div>
          <div className='flex flex-col w-full'>
            <label className='block text-text-2'>Email</label>
            <input
              className='rounded-[1.2rem] w-full h-[5.3rem] border-light-brown border-2 px-[2rem]'
              id='email'
              type='text'
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <p className='text-red-400'>
              {errors.email && touched?.email ? errors.email : ''}
            </p>
          </div>
        </div>
      </div>

      {/* 運送資訊 */}
      <div className='flex flex-col justify-between gap-[3rem]'>
        <div>
          <h2 className='text-[2rem] font-medium text-text-3'>運送資訊</h2>
        </div>

        <div className='flex gap-[4.5rem] w-full'>
          <div className='flex flex-col w-full'>
            <label className='block text-text-2'>國家 / 地區</label>
            <select
              className='rounded-[1.2rem] w-full h-[5.3rem] border-light-brown border-2 px-[1.5rem]'
              name='country'
              id='country'
              value={values.country}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <option value=''>請選擇國家</option>
              <option value='台灣'>台灣</option>
            </select>
            <p className='text-red-400'>
              {errors.country && touched?.country ? errors.country : ''}
            </p>
          </div>
          <div className='flex flex-col w-full'>
            <label className='block text-text-2'>城市</label>
            <select
              className='rounded-[1.2rem] w-full h-[5.3rem] border-light-brown border-2 px-[1.5rem]'
              name='city'
              id='city'
              value={values.city}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <option value=''>請選擇城市</option>
              {cities.map((city) => (
                <option value={city.name} key={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <p className='text-red-400'>
              {errors.city && touched?.city ? errors.city : ''}
            </p>
          </div>
        </div>

        <div className='flex gap-[4.5rem] w-full'>
          <div className='flex flex-col w-full'>
            <label className='block text-text-2'>街</label>
            <input
              className='rounded-[1.2rem] w-full h-[5.3rem] border-light-brown border-2 px-[2rem]'
              id='street'
              type='text'
              value={values.street}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <p className='text-red-400'>
              {errors.street && touched?.street ? errors.street : ''}
            </p>
          </div>
          <div className='flex flex-col w-full'>
            <label className='block text-text-2'>郵遞區號</label>
            <input
              className='rounded-[1.2rem] w-full h-[5.3rem] border-light-brown border-2 px-[2rem]'
              id='postalCode'
              type='text'
              value={values.postalCode}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <p className='text-red-400'>
              {errors.postalCode && touched?.postalCode
                ? errors.postalCode
                : ''}
            </p>
          </div>
        </div>

        <div className='flex gap-[4.5rem] w-full'>
          <div className='flex flex-col w-full'>
            <label className='block text-text-2'>包裝類型</label>
            <select
              className='rounded-[1.2rem] w-full h-[5.3rem] border-light-brown border-2 px-[1.5rem]'
              name='packageType'
              id='packageType'
              value={values.packageType}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <option value=''>請選擇包裝類型</option>
              <option value='紙箱'>紙箱</option>
            </select>
            <p className='text-red-400'>
              {errors.packageType && touched?.packageType
                ? errors.packageType
                : ''}
            </p>
          </div>
          <div className='flex flex-col w-full'>
            <label className='block text-text-2'>運送選項</label>
            <select
              className='rounded-[1.2rem] w-full h-[5.3rem] border-light-brown border-2 px-[1.5rem]'
              name='transportationOps'
              id='transportationOps'
              value={values.transportationOps}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <option value=''>請選擇運送選項</option>
              <option value='宅配'>宅配</option>
            </select>
            <p className='text-red-400'>
              {errors.transportationOps && touched?.transportationOps
                ? errors.transportationOps
                : ''}
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
