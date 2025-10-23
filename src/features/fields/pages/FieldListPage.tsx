import { Button } from '@/components/ui/button.tsx';
import FieldCard from '../components/card/FieldCard';
import FieldMap from '../components/map/FieldMap';
import { useFields } from '../hooks/fields.hooks';
import { FieldMapProvider } from '../contexts/FieldMapContext';
import { Link } from 'react-router-dom';
import { MapPinOff, Plus, ServerCrash } from 'lucide-react';
import ErrorDisplay from '@/components/ErrorDisplay.tsx';

const FieldListPage = () => {
  const { data: fields = [], isLoading, error } = useFields();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Завантаження полів...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <FieldMapProvider>
      <div className="min-h-screen w-full flex justify-center items-start py-8 px-2">
        <div className="w-full max-w-7xl space-y-8">
          {/* Header */}
          <header className="sticky top-0 z-10000 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-md flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-200 tracking-tight">
              Поля
            </h1>
            <Link to={'/fields/new'}>
              <Button
                size="lg"
                variant="default"
                className={
                  'flex items-center gap-2 px-7 py-3 rounded-full font-bold text-lg shadow-xl transition-all duration-200 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white dark:bg-gradient-to-r dark:from-green-700 dark:to-green-900 dark:hover:from-green-800 dark:hover:to-green-950 dark:text-green-100 dark:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2'
                }
              >
                <Plus />
                Додати поле
              </Button>
            </Link>
          </header>

          {/* Map Section */}
          <section
            className="space-y-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6"
            data-map-section
          >
            <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-2">
              Розташування полів
            </h2>
            <div className="w-full rounded-xl overflow-hidden">
              <FieldMap fields={fields} />
            </div>
          </section>

          {/* Field Cards List */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-2">
              Деталі полів
            </h2>
            {fields.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-600 mb-4">
                  {error ? (
                    <ServerCrash className="h-12 w-12 text-destructive mx-auto" />
                  ) : (
                    <MapPinOff className="h-12 w-12 text-muted-foreground mx-auto" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Немає полів
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Розпочніть із додавання першого поля до вашої ферми
                </p>
                <Link to={'/fields/new'}>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Додати перше поле
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {fields.map((field) => (
                  <div
                    key={field.id}
                    className="transition-transform duration-200 hover:scale-[1.03]"
                  >
                    <FieldCard field={field} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </FieldMapProvider>
  );
};

export default FieldListPage;
