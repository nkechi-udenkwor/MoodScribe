import 'chart.js/auto';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { getJournals } from '../../redux/journals/features';

const Analysis = () => {
  const dispatch = useAppDispatch();
  const { journals } = useAppSelector((state: RootState) => state.journals);
  const hasJournals = journals.journals.length > 0;

  useEffect(() => {
    dispatch(getJournals());
  }, [dispatch]);

  const data = {
    labels: journals.journals.map((entry) =>
      new Date(entry.date).toLocaleDateString(),
    ),
    datasets: [
      {
        label: 'Mood Score',
        data: journals.journals.map((entry) => entry.mood.value),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 8,

        ticks: {
          color: '#C5C5C5',
          padding: 10,
        },
      },
      x: {
        ticks: {
          color: '#C5C5C5',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#C5C5C5',
        },
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function (context: any) {
            const moodEntry = journals.journals[context.dataIndex];
            return `${moodEntry.mood.name}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className='container mx-auto max-w-4xl my-14 p-4'>
      <h2 className='text-white text-2xl text-center mb-11'>Mood Chart</h2>
      <div className='relative'>
        <Line data={data} options={options} />
        {!hasJournals && (
          <p className='absolute inset-0 flex items-center justify-center text-gray-400 text-sm text-center px-4'>
            No journal entries yet. Add a journal entry to see your mood chart.
          </p>
        )}
      </div>
    </div>
  );
};

export default Analysis;
