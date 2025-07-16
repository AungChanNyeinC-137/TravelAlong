import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns'
import { Header } from '~/components'
import type { Route } from './+types/allUsers'
import { comboBoxItems, selectItems } from '~/constants';
import { formatKey } from '~/lib/utils';
import { LayerDirective, LayersDirective, MapsComponent } from '@syncfusion/ej2-react-maps';

export const loader = async () => {
  // Add 'maps' to the fields query parameter
  const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flag,latlng,maps');
  const data = await response.json();

  return data.map((country: any) => ({
    name: `${country.flag} ${country.name.common}`, // This correctly combines the emoji and name
    coordinates: country.latlng,
    value: country.name.common,
    openStreetMap: country.maps?.openStreetMaps,
  }));
};

const createTrip = ({ loaderData }: Route.ComponentProps) => {
  const handleSubmit = async () => { };
  const handleChange = (key: keyof TripFormData, value: string | number) => {

  }
  const countries = loaderData as Country[];

  const countryData = countries.map((country) => ({
    text: country.name,
    value: country.value,
  }))
  return (
    <main className='flex flex-col gap-10 pb-20 wrapper'>
      <Header title='Add a New Trip' description='View and Edit AI generated✨ travel plans' />
      <section className='wrapper-md mt-2.5'>
        <form action="submit" onSubmit={handleSubmit} className='trip-form'>
          <div>
            <label htmlFor="country">Country</label>
            <ComboBoxComponent
              id='country'
              dataSource={countryData}
              fields={{ text: 'text', value: 'value' }}
              placeholder='Select a Country'
              className='combo-box'
              change={(e: { value: string | undefined }) => {
                if (e.value) {
                  handleChange('country', e.value)
                }
              }}
              allowFiltering
              filtering={(e) => {
                const query = e.text.toLowerCase();
                e.updateData(
                  countries
                    .filter((country) => country.name.toLowerCase().includes(query))
                    .map((country) => ({
                      text: country.name,
                      value: country.value,
                    })))
              }}
            />
          </div>
          <div>
            <label htmlFor="duration">Duration</label>
            <input
              type="duration"
              name='Duration'
              placeholder='Enter a number of days(5,12,...)'
              className='form-input placeholder:text-gray-100'
              onChange={(e) => handleChange('duration', Number(e.target.value))}
            />
          </div>
          {/* iterate through the constants to create Selects */}
          {selectItems.map((key) => (
            <div key={key}>
              <label htmlFor={key}>{formatKey(key)}</label>
              <ComboBoxComponent
                id={key}
                dataSource={comboBoxItems[key].map((item) => ({
                  text: item,
                  value: item,
                }))}
                fields={{ text: 'text', value: 'value' }}
                placeholder={`Select ${formatKey(key)}`}
                change={(e: { value: string | undefined }) => {
                  if (e.value) {
                    handleChange(key, e.value)
                  }
                }}
                allowFiltering
                filtering={(e) => {
                  const query = e.text.toLowerCase();
                  e.updateData(
                    comboBoxItems[key]
                      .filter((item) => item.toLowerCase().includes(query))
                      .map((item) => ({
                        text: item,
                        value: item,
                      })))
                }}
                className='combo-box'
              />
            </div>
          ))}
      <div>
        <label htmlFor="location">
          Location on the world map
        </label>
        <MapsComponent>
          <LayersDirective>
            <LayerDirective>
              
            </LayerDirective>
          </LayersDirective>
        </MapsComponent>
      </div>
        </form>
      </section>
    </main>

  )
}

export default createTrip