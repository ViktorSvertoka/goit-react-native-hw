![react-native](./react-native-logo.png)

---

# goit-react-native-hw

## ДЗ №1

### Завдання​

1. Встановити expo

2. Встановити Android Studio

3. Встановити Xcode (якщо працюєте на Mac)

4. Ініціалізувати проект за допомогою expo (Вибираємо шаблон проекту blank)

5. Запустити проект

6. Налаштувати Android Studio

7. Налаштувати Xcode (якщо працюєте на Mac)

8. Встановити expo client собі на телефон

9. Запустити створений проект на телефоні, емуляторі Android, симуляторі iOS
   (якщо працюєте на Mac)

## ДЗ №2

### Завдання​

1. Створити папку Screens

2. Створити компонент RegistrationScreen

3. Створити компонент LoginScreen

4. Створити екран PostsScreen

5. Додати розмітку форми в компонент RegistrationScreen

6. Додати розмітку форми в компонент LoginScreen

7. Додати стилі до компонента RegistrationScreen

8. Додати стилі до компонента LoginScreen

## ДЗ №3

### Завдання​

1. Додати логіку роботи з формою в компонент RegistrationScreen

2. Додати логіку роботи з формою в компонент LoginScreen

3. Під час сабміту форм збирати дані з них і виводити в консоль

4. Додати автозакриття клавіатури по кліку за межами форм (Використовуємо
   Keyboard.dismiss)

## ДЗ №4

### Завдання​

1. Створити екран CreatePostsScreen

2. Створити екран CommentsScreen

3. Створити екран ProfileScreen

4. Створити екран MapScreen

5. Створити екран Home

6. Підключити в проект навігацію.

7. Додати в проект переходи між екранами LoginScreen, RegistrationScreen за
   допомогою компонента createStackNavigator

8. З RegistrationScreen можна перейти на LoginScreen, натиснувши на текст Увійти

9. З LoginScreen можна перейти на RegistrationScreen, натиснувши на текст
   Зареєструватися

10. Після сабміту в LoginScreen, RegistrationScreen перекидає на Home, де
    відразу показується екран PostsScreen

11. Підключити нижню навігацію, використовуючи createBottomTabNavigator

12. У нижній навігації створити 3 переходи.

13. Клік по іконці №1 веде на екран PostsScreen

14. Клік по іконці №2 веде на екран CreatePostsScreen

15. Клік по іконці №3 веде на екран ProfileScreen

16. В хедері на екрані PostsScreen додати іконку для logout

17. Стилізувати нижню навігацію

## ДЗ №5

### Завдання​

1. Підключити камеру в компонент CreatePostsScreen

2. Під час відкриття екрану CreatePostsScreen активується камера і зображення з
   неї виводиться в блок з іконкою камери

3. По кліку на іконку камери робиться знімок

4. В інпут з плейсхолдером Назва можна додати назву фото

5. В інпут з плейсхолдером Місцевість можна додати назву, де було зроблено
   знімок

6. Додати визначення геолокації в момент створення посту при кліку на кнопку
   Опублікувати

7. Після створення посту повинно перенаправляти на екран PostsScreen

8. В компоненті окремого посту при кліку на іконку коментарів перекидає на екран
   CommentsScreen

9. У компоненті окремого посту під час кліку на іконку геолокації перекидає на
   екран MapScreen, де можна побачити мапу з маркером, де була зроблена
   фотографія

## ДЗ №6

### Завдання​

1. Підключити Redux до проекту

2. Підключити Firebase до проекту

3. Додати логіку реєстрації на екрані RegistrationScreen через методи Firebase

4. Додати логіку логіна на екрані LoginScreen через методи Firebase

5. Оновити профіль користувача на Firebase та додати туди логін у поле
   displayName після реєстрації

6. Зберігати дані про користувача в Redux після реєстрації або логінізації

7. Додати перевірку, чи залогінений користувач у застосунку чи ні. Якщо
   залогінений, то відразу перенаправляти на екран PostsScreen, інакше - на
   екран LoginScreen

8. Додати логіку Logout на екрані PostsScreen під час натискання на іконку в
   хедері, використовуючи методи Firebase

9. Додати логіку завантаження постів у базу даних, використовуючи Firebase та
   Redux

10. Додати логіку додавання коментаря під постом, використовуючи Firebase та
    Redux

## ДЗ №7

### Завдання​

1. Викласти проект на сервери expo

---

`npx expo start`
