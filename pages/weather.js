export const getStaticProps = async () => {
  const res = await fetch(
    "/api.openweathermap.org/data/2.5/weather?q=London&appid=a60e6e63615bfd115f40208faf0ebc46"
  );
  const data = await res.json();

  return {
    props: { ninjas: data },
  };
};

const Ninjas = ({ ninjas }) => {
  console.log(ninjas);

  return (
    <div>
      <h1>All Ninjas</h1>
      {ninjas.map((ninja) => (
        <div key={ninja.id}>
          <a>
            <h3>{ninja.name}</h3>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Ninjas;
