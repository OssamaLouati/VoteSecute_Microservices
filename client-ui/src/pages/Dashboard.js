import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import styles from "../style/Dashboard.module.css";

// CustomTooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { name, img_URL, votes_number } = payload[0].payload;
    return (
      <div className={styles.customTooltip}>
        <img src={img_URL} alt={name} style={{ width: '100px', height: '100px' }} />
        <p>{label}</p>
        <p>Votes: {votes_number}</p>  
      </div>
    );
  }

  return null;
};

function Dashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showWinners, setShowWinners] = useState(false);

  useEffect(() => {
    fetch("http://localhost:7000/results")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
        toast.success("Results fetched successfully!");
      })
      .catch((error) => {
        console.error("Error fetching results:", error);
        toast.error("Error fetching results!");
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const renderColorfulBar = (entry, highestVote) => {
    return entry.votes_number === highestVote ? "#FF4500" : "#8884d8";
  };

  return (
    <div>
      <button onClick={() => setShowWinners(!showWinners)}>
        {showWinners ? "Go back to statistics" : "Show winners"}
      </button>
      <TransitionGroup>
        <CSSTransition
          key={showWinners ? "winners" : "statistics"}
          timeout={500} // matches with the transition duration in CSS
          classNames={styles.fade} // class name defined in CSS
        >
          <div>
            {showWinners
              ? data.map((result, index) => {
                  const totalVotes = result.candidates.reduce(
                    (total, candidate) => total + candidate.votes_number,
                    0
                  );
                  const highestVote = Math.max(
                    ...result.candidates.map(
                      (candidate) => candidate.votes_number
                    )
                  );
                  const winners = result.candidates.filter(
                    (candidate) => candidate.votes_number === highestVote
                  );
                  const winnerPercentage = (
                    (highestVote / totalVotes) *
                    100
                  ).toFixed(2);
                  return (
                    <div key={index}>
                      <h2>Winner(s) for {result.role}</h2>
                      {winners.map((winner) => (
                        <div key={winner.name}>
                          <img
                            src={winner.img_URL}
                            alt={winner.name}
                            style={{ width: "100px", height: "100px" }}
                          />
                          <p>
                            {winner.name}: {winner.votes_number} votes.
                          </p>
                          <p>{winnerPercentage}% of total votes</p>
                        </div>
                      ))}
                    </div>
                  );
                })
              : data.map((result, index) => {
                  const highestVote = Math.max(
                    ...result.candidates.map(
                      (candidate) => candidate.votes_number
                    )
                  );
                  return (
                    <div key={index}>
                      <h2>Role: {result.role}</h2>
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                          data={result.candidates}
                          margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar dataKey="votes_number">
                            {result.candidates.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={renderColorfulBar(entry, highestVote)}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  );
                })}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default Dashboard;
