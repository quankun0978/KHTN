import { useState } from 'react';
import { Steps } from 'antd';

function Dashboard() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
