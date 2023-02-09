import { Dispatch, SetStateAction } from 'react';

interface Props {
  commentPerPage: number;
  totalComments: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({
  commentPerPage,
  totalComments,
  currentPage,
  setCurrentPage,
}: Props) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalComments / commentPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='flex justify-end gap-[1.5rem]'>
        {pageNumbers
          ? pageNumbers.map((num) => (
              <li
                className={`${
                  currentPage !== num ? 'opacity-50' : 'opacity-80'
                } flex items-center justify-center bg-asparagus-3 text-white font-medium w-[4rem] h-[4rem] rounded-[1rem] hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer hover:opacity-100`}
                key={num}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </li>
            ))
          : null}
      </ul>
    </nav>
  );
};

export default Pagination;
