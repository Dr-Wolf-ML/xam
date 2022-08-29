export const headerGridProps = {
    className: 'listGrid',
    width: '100%',
    templateColumns: '1fr 2fr 2fr 3fr 3fr 2fr',
    templateAreas: 'record branchId userName name position action',
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '10px',
};

export const listGridProps = {
    className: 'listGrid',
    width: '100%',
    templateColumns: '1fr 2fr 2fr 3fr 3fr 2fr',
    templateAreas: 'record branchId userName name position action',
    fontSize: '1.2rem',
    fontWeight: '400',
    border: '1px solid white',
};

export const recordProps = {
    className: 'record',
    area: 'record',
    style: { placeSelf: 'center', alignSelf: 'center' },
};

export const branchIdProps = {
    area: 'branchId',
    style: { placeSelf: 'start', alignSelf: 'center' },
};

export const userNameProps = {
    area: 'userName',
    style: { placeSelf: 'start', alignSelf: 'center' },
};

export const nameProps = {
    area: 'name',
    style: { placeSelf: 'start', alignSelf: 'center' },
};

export const positionProps = {
    area: 'position',
    style: { placeSelf: 'start', alignSelf: 'center' },
};

export const actionProps = {
    className: 'action',
    area: 'action',
    style: {
        placeSelf: 'center',
        alignSelf: 'center',
    },
};

export const buttonProps = {
    className: 'button',
    area: 'action',
    style: {
        margin: '8px',
        padding: '2px 12px 2px 12px',
        placeSelf: 'center',
        alignSelf: 'center',
    },
};
