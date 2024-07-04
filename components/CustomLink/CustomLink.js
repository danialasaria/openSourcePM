const CustomLink = ({ href, children }) => {
    return (
      <a href={href} style={{ color: "blue", textDecoration: "underline" }}>
        {children}
      </a>
    );
  };
  
  export default CustomLink;