import Button from '../UI/Button.tsx';

export interface WeekTableCellProps {
  data: {
    lunch: boolean;
    breakfast: boolean;
    benefit: boolean;
    active: boolean;
  };
}

export default function WeekTableCell({ data }: WeekTableCellProps) {
  if (!data.active) {
    return <td className="mx-2 w-full h-full"></td>;
  }

  const breakfastClass = `w-full my-1 min-h-6 py-1 ${data.breakfast ? 'btn-primary' : 'btn-secondary'} block`;

  return (
    <td className="mx-2">
      <Button
        disabled={data.benefit}
        className={data.benefit ? `${breakfastClass} bg-gray-500 hover:bg-gray-500` : breakfastClass}
      >
        Breakfast
      </Button>
      <Button className={`w-full my-1 min-h-6 py-1 ${data.lunch ? 'btn-primary' : 'btn-secondary'} block`}>
        Lunch
      </Button>
    </td>
  );
}
