import { BsInstagram, BsLinkedin, BsFacebook, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="absolute -bottom-10  w-full mt-20">
      <section className="relative bg-gradient-to-r from-orange-500 to-teal-500 mb-auto p-5 text-gray-300">
        <div className="flex justify-center items-center gap-5">
          <a href="https://www.facebook.com" target="_blank">
            <BsFacebook size={15} />
          </a>
          <a href="https://www.instagram.com" target="_blank">
            <BsInstagram size={15} />
          </a>
          <a href="https://www.linkedin.com" target="_blank">
            <BsLinkedin size={15} />
          </a>
          <a href="https://www.twitter.com" target="_blank">
            <BsTwitter size={15} />
          </a>
          <p>© 2023 Ludus project®</p>
        </div>
      </section>
    </footer>
  );
  3;
};

export default Footer;
