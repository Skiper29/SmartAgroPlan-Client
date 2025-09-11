import { Button } from '@/components/ui/button.tsx';
import FieldCard from '../components/FieldCard';
import FieldMap from '../components/FieldMap';
import { mockFields } from '@/testing/data/field-data';

const FieldListPage = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-start py-8 px-2">
      <div className="w-full max-w-7xl space-y-8">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-md flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-200 tracking-tight">
            Поля
          </h1>
          <Button
            size="lg"
            variant="default"
            className={
              'flex items-center gap-2 px-7 py-3 rounded-full font-bold text-lg shadow-xl transition-all duration-200 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white dark:bg-gradient-to-r dark:from-green-700 dark:to-green-900 dark:hover:from-green-800 dark:hover:to-green-950 dark:text-green-100 dark:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2'
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Додати поле
          </Button>
        </header>

        {/* Map Section */}
        <section className="space-y-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-2">
            Розташування полів
          </h2>
          <div className="w-full rounded-xl overflow-hidden">
            <FieldMap fields={mockFields} />
          </div>
        </section>

        {/* Field Cards List */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-2">
            Деталі полів
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockFields.map((field) => (
              <div className="transition-transform duration-200 hover:scale-[1.03]">
                <FieldCard key={field.id} field={field} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FieldListPage;
