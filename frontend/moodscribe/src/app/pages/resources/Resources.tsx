import { FC, useEffect, useState } from 'react';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../redux/store';
import { getArticles, searchArticles } from '../../../redux/articles/features';
import Article from './components/Article';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Modal } from './components/Modal';

const Resources: FC = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { articles } = useAppSelector((state: RootState) => state.articles);
  const { articlesSearch, success } = useAppSelector(
    (state: RootState) => state.articlesSearch
  );

  useEffect(() => {
    dispatch(getArticles());
  }, [articlesSearch, dispatch]);

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(searchArticles(searchValue));
    if (success) {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className='sticky top-0 z-20 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 py-4 px-4'>
        <div className='flex justify-end'>
          <form className='w-full max-w-md'>
            <label
              htmlFor='default-search'
              className='mb-2 text-sm font-medium sr-only text-white'
            >
              Search
            </label>
            <div className='relative'>
              <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
                <Icon
                  icon='material-symbols-light:search'
                  className='h-5 w-5 text-gray-400'
                />
              </div>
              <input
                type='search'
                id='default-search'
                className='block w-full rounded-lg border border-gray-600 bg-slate-700 bg-opacity-70 py-3 ps-10 pe-24 text-sm text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400'
                placeholder='Search more mental health tips...'
                required
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                type='submit'
                className='absolute end-2.5 top-1/2 -translate-y-1/2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300'
                onClick={(e) => handleSearch(e)}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='container mx-auto mb-10 mt-6 w-full max-w-2xl px-4 text-white'>
        <h1 className='font-bold text-2xl text-center'>
          Discover Helpful Articles & Tips
        </h1>
        <p className='py-6'>
          Explore our collection of articles and tips to support your mental
          well-being. Find practical advice, coping strategies, and self-care
          techniques to enhance your mental health. Dive in and empower yourself
          with valuable insights and knowledge.
        </p>
        <div className='sm:grid grid-cols-auto-fit-100 gap-7'>
          {articles.map((article, idx) => (
            <div key={idx} className=''>
              <Article article={article} />
            </div>
          ))}
        </div>
      </div>
      <Modal
        showModal={showModal}
        closeModal={() => {
          setShowModal((prev) => !prev);
        }}
      >
        <div className='sm:grid grid-cols-auto-fit-100 gap-7 text-white'>
          {articlesSearch.map((article, idx) => (
            <div key={idx} className=''>
              <Article article={article} />
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default Resources;
