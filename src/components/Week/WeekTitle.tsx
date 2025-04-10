import { useCallback, useEffect, useRef, useState } from 'react';
import userManager from '../../managers/UserManager.ts';
import { Modal, ModalDisplayHandle } from '../UI/Modal.tsx';
import { WeekDayTotal } from '../../models/types.ts';
import Button from '../UI/Button.tsx';

export default function WeekTitle() {
  const [totals, setTotals] = useState({});
  const modal = useRef<ModalDisplayHandle>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const downloadAsHTML = () => {
    if (tableRef.current) {
      const content = tableRef.current.innerHTML;
      const blob = new Blob([content], { type: 'text/html' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'table.html';
      link.click();
    }
  };

  const fetchTotalsCb = useCallback(() => userManager.dishPerDay(), []);

  useEffect(() => {
    const fetchTotals = async function () {
      const data = await fetchTotalsCb();
      setTotals(data);
    };

    fetchTotals().then();
  }, [fetchTotalsCb]);

  const handleClick = () => {
    if (modal.current) {
      modal.current.open();
    }
  };

  const handleClose = () => {
    if (modal.current) {
      modal.current.close();
    }
  };

  return (
    <div>
      <Button className={'bg-gray-500 text-amber-200 rounded px-1 m-1'} onClick={downloadAsHTML}>
        Download
      </Button>
      <Modal onClose={handleClose} ref={modal}>
        <div ref={tableRef}>
          <ul className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
            {Object.entries<WeekDayTotal>(totals).map(([dayName, data], index) => {
              return (
                <li key={'wdt-' + dayName} className="p-4 bg-white rounded-md shadow-sm">
                  <h3 className="text-lg font-semibold text-blue-600">{dayName}</h3>
                  <ol className="mt-2 space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Total:</span> {data.total}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Count:</span> {data.count}
                    </p>
                    <p className="text-gray-700 font-medium">Children:</p>
                    <ol className="pl-4 mt-2 space-y-1 list-disc list-inside">
                      {data.users.map((userName) => (
                        <li key={`${dayName}-${userName}-${index}`} className="text-gray-600">
                          {userName}
                        </li>
                      ))}
                    </ol>
                  </ol>
                </li>
              );
            })}
          </ul>
          <Button className={'btn-primary'} onClick={handleClose}>
            OK
          </Button>
        </div>
      </Modal>
      <h3 className="h-full py-2 flex justify-center w-auto text-stone-600 text-xl font-bold" onClick={handleClick}>
        Week
      </h3>
    </div>
  );
}
