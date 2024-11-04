from models.models import User


def load_users() -> list[User]:
    return [
        User(
            id=1,
            name="Маша Иванова",
            role="Senior Developer",
            department="IT",
            avatar_url="https://i.pravatar.cc/56?u=1",
        ),
        User(
            id=2,
            name="Иван Петров",
            role="Middle Developer",
            department="IT",
            avatar_url="https://i.pravatar.cc/56?u=2",
        ),
        User(
            id=3,
            name="Сергей Сидоров",
            role="Junior Developer",
            department="IT",
            avatar_url="https://i.pravatar.cc/56?u=3",
        ),
        User(
            id=4,
            name="Анна Козлова",
            role="Senior Developer",
            department="Design",
            avatar_url="https://i.pravatar.cc/56?u=4",
        ),
        User(
            id=5,
            name="Дмитрий Смирнов",
            role="Middle Developer",
            department="Design",
            avatar_url="https://i.pravatar.cc/56?u=5",
        ),
    ]
