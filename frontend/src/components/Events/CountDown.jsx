import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { server } from "../../server";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEventOver, setIsEventOver] = useState(false);

  const calculateTimeLeft = useCallback((finishDate) => {
    const targetDate = new Date(finishDate);
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, []);

  useEffect(() => {
    if (!data?.finish_Date) {
      console.error("Data inválida ou ausente:", data);
      return;
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(data.finish_Date);
      if (newTimeLeft) {
        setTimeLeft(newTimeLeft);
      } else {
        clearInterval(timer);
        setIsEventOver(true);
        axios
          .delete(`${server}/event/delete-shop-event/${data._id}`)
          .catch((error) => console.error("Erro ao excluir o evento:", error));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data, calculateTimeLeft]);

  const formatTime = (value) =>
    new Intl.NumberFormat("pt-BR", { minimumIntegerDigits: 2 }).format(value);

  if (isEventOver) {
    return <span className="text-[red] text-[25px]">Evento já terminou</span>;
  }

  return (
    <div className="text-[25px] text-[#475ad2]">
      Restam {formatTime(timeLeft.days)} dias, {formatTime(timeLeft.hours)}{" "}
      horas, {formatTime(timeLeft.minutes)} minutos e{" "}
      {formatTime(timeLeft.seconds)} segundos
    </div>
  );
};

export default CountDown;
