import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import netflixLogo from "../assets/netflix-icon.png";
import bg from "../assets/footer-bg.jpg";

const footerLinks = [
  "Audio Description",
  "Investor Relations",
  "Legal Notices",
  "Help Center",
  "Jobs",
  "Cookie Preferences",
  "Gift Cards",
  "Term of Use",
  "Top IMDB",
  "Media Center",
  "Privacy",
  "Contact Us",
];

const footerSocials = [FaFacebook, FaInstagram, FaTwitter, FaYoutube];

const Footer = () => {
  return (
    <div
      className="relative bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="mx-auto flex flex-col px-8 pb-20 pt-16 sm:px-14 md:px-20 md:pb-6 lg:px-40 xl:px-72">
        <img
          className="mx-auto mb-8 w-28 select-none"
          src={netflixLogo}
          alt="Netflix Logo"
        />
        <div className="mb-4 flex items-center gap-4 text-2xl text-white">
          {footerSocials.map((FooterSocial, index) => (
            <FooterSocial
              key={index}
              className="cursor-pointer text-white transition duration-500 hover:-translate-y-1 hover:text-dark-gray"
            />
          ))}
        </div>
        <div className="mb-4 grid select-none grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 md:gap-x-10 lg:grid-cols-4 lg:gap-x-14 xl:gap-x-16">
          {footerLinks.map((footerLink, index) => (
            <li
              key={index}
              className="list-none text-base text-light-gray transition-colors duration-500 hover:text-dark-gray"
            >
              {footerLink}
            </li>
          ))}
        </div>
        <span className="select-none text-base text-misty-gray">
          Copyright © 2023 NVVuong. All rights reserved.{" "}
        </span>
      </div>
    </div>
  );
};

export default Footer;
