import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../../server";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isEventOver, setIsEventOver] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data) return;

    setLoading(false);

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(data.Finish_Date);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft === null) {
        axios
          .delete(`${server}/event/delete-shop-event/${data._id}`)
          .then(() => {
            setIsEventOver(true);
          })
          .catch((error) => {
            console.error("Erro ao excluir o evento:", error);
          });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  function calculateTimeLeft(finishDate) {
    const difference = +new Date(finishDate) - +new Date();
    if (difference <= 0) return null;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  if (loading) return <div>Carregando...</div>;

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) return null;

    return (
      <span className="text-[25px] text-[#475ad2]" key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Evento já terminou</span>
      )}
    </div>
  );
};

export default CountDown;
