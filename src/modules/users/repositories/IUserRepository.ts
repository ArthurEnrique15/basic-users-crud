interface IUserRepository {
    create();
    update();
    softDelete();
    restore();
    list();
}

export { IUserRepository };
