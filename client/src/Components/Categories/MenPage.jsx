import DisplayProducts from "./DisplayProducts";

const MenPage = ({hostlink,menProducts}) => {

  
    return (
      <DisplayProducts hostlink={hostlink} products={menProducts}/>
    );
}

export default MenPage;