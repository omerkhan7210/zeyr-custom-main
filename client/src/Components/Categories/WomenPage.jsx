import DisplayProducts from "./DisplayProducts";

const WomenPage = ({womenProducts,hostlink}) => {
    return (
      <DisplayProducts products={womenProducts} hostlink={hostlink} />
    );
}

export default WomenPage;