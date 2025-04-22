import { getCldImageUrl } from 'next-cloudinary'; 

// the central controll of all the images.

export const heroImageUrl = getCldImageUrl({
    width: 1200,
    height: 1200,
    src: "seed-images/hero",
  });


  export const doctorsImageUrl = (doctorsImage: string) => {
    return getCldImageUrl({
        width: 500,
        height: 500,
        src: doctorsImage,
    })
  }


  export const contactImageUrl = getCldImageUrl({
    height: 1200,
    width: 1200,
    src: "seed-images/contact2",
  })

  export const logoImageUrl = getCldImageUrl({
    height: 100,
    width: 100,
    src: "seed-images/logo",
  });

  export const aboutImageUrl = getCldImageUrl({
    height: 1200,
    width: 1200,
    src: "seed-images/about_image2",
  })