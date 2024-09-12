import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Controller, useForm } from 'react-hook-form';
import agent from '../../data/agent';
import BeerGif from '../../images/beer.gif';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const { control, handleSubmit } = useForm();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const navigate = useNavigate();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    // Dodajte ostale podatke iz forme
    formData.append('firstName', data.FirstName);
    formData.append('lastName', data.LastName);
    formData.append('userName', data.UserName);
    formData.append('password', data.Password);
    formData.append('email', data.Email);

    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      await agent.Auth.register(formData);
      navigate('/auth/signin');
      window.location.reload();
    } catch (error) {
      console.log('ne valja kume: ', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Sign Up" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <img src={BeerGif} alt="beer" />
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up to TailAdmin
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    First name
                  </label>
                  <div className="relative">
                    <Controller
                      name="FirstName"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter your first name"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      )}
                    />
                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* SVG path for the icon */}
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Last name
                  </label>
                  <div className="relative">
                    <Controller
                      name="LastName"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter your last name"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      )}
                    />
                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* SVG path for the icon */}
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <Controller
                      name="Email"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      )}
                    />
                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* SVG path for the icon */}
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Username
                  </label>
                  <div className="relative">
                    <Controller
                      name="UserName"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter your username"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      )}
                    />
                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* SVG path for the icon */}
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <Controller
                      name="Password"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      )}
                    />
                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* SVG path for the icon */}
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Profile Picture
                  </label>
                  <input
                    id="ProfilePicture"
                    name="ProfilePicture"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-black py-4 text-white"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
