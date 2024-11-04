from django.db import models


class UserProfile(models.Model):
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)  # Поле для фото
    full_name = models.CharField(max_length=255)  # ФИО
    birth_date = models.DateField(null=True, blank=True)  # Дата рождения
    department = models.CharField(max_length=255)  # Департамент
    position = models.CharField(max_length=255)  # Должность
    start_date = models.DateField(null=True, blank=True)  # Дата начала работы
    male = models.CharField(max_length=255)  # Пол
    # raiting = models.FloatField()
    def __str__(self):
        return self.full_name


class Methodology(models.Model):
    name = models.CharField(max_length=255)  # Название методологии
    criteria = models.JSONField()  # Критерии в формате JSON

    def __str__(self):
        return self.name


class StatusMethodology(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)  # Связь с профилем пользователя
    methodology = models.ForeignKey(Methodology, on_delete=models.CASCADE)  # Связь с методологией
    status = models.BooleanField(default=False)  # Статус анкетирования (пройдено/не пройдено)

    def __str__(self):
        return f"{self.user.full_name} - {self.methodology.name} - {'Completed' if self.status else 'Not Completed'}"


class FormAnswer(models.Model):
    user_given = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='answers_given')  # Связь с профилем пользователя
    user_accept = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='answers_accepted')  # Связь с профилем пользователя
    methodology = models.ForeignKey(Methodology, on_delete=models.CASCADE)  # Связь с методологией
    answers = models.JSONField()  # Ответы в формате JSON

    def __str__(self):
        return f"Answers by {self.user_given.full_name} for {self.methodology.name}"
    
    
class NeedAnswer(models.Model):
    user_given = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='need_user_given')  # Связь с профилем пользователя
    user_accept = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='need_user_accepted')  # Связь с профилем пользователя
    methodology = models.ForeignKey(Methodology, on_delete=models.CASCADE)  # Связь с методологией
    status = models.BooleanField()  # Ответы в формате JSON

    def __str__(self):
        return f"Пользователь {self.user_given.full_name} дал отзыв {self.user_accept.full_name}"


class ResultMethodology(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)  # Связь с профилем пользователя
    methodology = models.ForeignKey(Methodology, on_delete=models.CASCADE)  # Связь с методологией
    matrix_competence = models.JSONField() # Матрица компетенций    
    created_at = models.DateTimeField(auto_now_add=True)  # Дата создания записи

    def __str__(self):
        return f"Result for {self.user.full_name} - {self.methodology.name}"
    

class UserCard(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)  # Связь с профилем пользователя
    skills = models.JSONField()  # Обработанные данные в формате JSON
    description = models.TextField()  # Краткое описание для пользователя
    
    created_at = models.DateTimeField(auto_now_add=True)  # Дата создания записи

    def __str__(self):
        return f"Result for {self.user.full_name}"