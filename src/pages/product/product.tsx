import Title from '@/components/title';
import React from 'react'

const Product = () => {
  return (
    <div className="flex gap-8 flex-col justify-end">
      <Title title="Product" />

      {/* <AddGovernorates /> */}

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {/* {data?.length !== 0 &&
          data?.map(({ _id, name }) => (
            <Card key={_id}>
              <CardContent className="font-semibold p-4">
                <h2>Name: {name}</h2>
              </CardContent>

              <CardFooter className="flex justify-end gap-2">
                <Link
                  to={_id}
                  className={buttonVariants({ variant: "outline" })}
                >
                </Link>

                <DeleteDialog
                  id={_id}
                  deleteFn={mutate}
                  isLoading={isPending}
                />
              </CardFooter>
            </Card>
          ))}
        {data?.length === 0 && <NoData />} */}
      </div>
    </div>
  );
}

export default Product