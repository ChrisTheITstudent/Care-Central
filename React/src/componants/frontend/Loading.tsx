interface LoadingProps {
    loadingText?: string
}

function Loading({loadingText = "Loading..."}: LoadingProps) {
  return (
      <div className='loading-screen'>
          <div className='spinner' />
          <p>{loadingText}</p>
      </div>
  )
}

export default Loading