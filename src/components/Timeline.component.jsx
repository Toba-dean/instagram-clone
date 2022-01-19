import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import useMyPhotos from '../hooks/useMyPhotos';
import usePhotos from '../hooks/usePhotos';
import Post from './Post/Post.component';

const Timeline = () => {

  const { photos } = usePhotos()
  const { photo } = useMyPhotos()

  console.log(photos, photo);

  return (
    <div className='container col-span-2'>
      {
        !photo ? (
          <>
            <Skeleton count={4} width={640} height={500} className="mb-5"/>
          </>
        ) : photo?.length > 0 ? (
          photo.map(content =>  <Post key={content.docId} content={content} />)
        ) : (
          <p className='text-center text-2xl'>Follow people to see photos</p>
        )
      }
      {
        !photos ? (
          <>
            <Skeleton count={4} width={640} height={500} className="mb-5"/>
          </>
        ) : photos?.length > 0 ? (
          photos.map(content =>  <Post key={content.docId} content={content} />)
        ) : (
          <p className='text-center text-2xl'>Follow people to see photos</p>
        )
      }
    </div>
  )
}

export default Timeline
 