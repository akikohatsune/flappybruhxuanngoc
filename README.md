# flappybruhxuanngoc

> File bundle đã bị minify nên phần lớn logic game nằm trên một dòng rất dài. Đây là các minified names tạm thời, dễ bị thay đổi ở các bản release tiếp theo.

## Speedrun để bạn hiểu

Trong game có một số cơ chế được hard-code quanh mốc **5 điểm**:

1. Khi người chơi đạt đúng `5` điểm, ống hiện tại bị đưa tới vị trí ngang gần như trùng với con chim.
2. Khi điểm số `>= 5`, hàm xử lý flap/click sẽ thoát ngay và người chơi không thể vỗ cánh tiếp.
3. Va chạm với ống, trần hoặc sàn đều gọi cùng một hàm `gameover`.
4. Điểm cao nhất chỉ được lưu trong `localStorage`, vì vậy có thể thay đổi trực tiếp bằng DevTools.

Hai điều kiện liên quan tới mốc 5 điểm cho thấy game đã được viết theo cách khiến việc vượt qua mốc này trở nên cực kỳ khó, hoặc gần như không thể.

---

## 1. Khi đạt 5 điểm, ống bị đưa sát vị trí con chim

Đoạn code minify trông như thế này:

```js
!P.scored&&P.x<.42&&(
  P.scored=!0,
  Il++,
  Il===5&&(
    P.x=.38,
    P.gapY=Math.max(.18,Math.min(.82,(Ol*fl-sl)/(I-sl)))
  ),
  ...
)
```

Vị trí ngang của con chim được tính bằng:

```js
Bt=J*.42
```

Vị trí ngang của ống trên màn hình được tính bằng:

```js
Ga=J*.2+P.x*J*.58
```

Khi đạt 5 điểm, game gán:

```js
P.x=.38
```

Thay vào là:

```text
Ga / J = 0.2 + 0.38 × 0.58
       = 0.4204
```

Trong khi con chim nằm ở:

```text
Bt / J = 0.42
```

Tức là sau khi đạt 5 điểm, ống nằm ở khoảng **42,04%** chiều rộng màn hình, còn con chim nằm ở **42%**.

Hai vị trí này gần như trùng nhau.

Ngoài ra, tâm khe hở của ống cũng bị đưa tới gần vị trí dọc hiện tại của con chim:

```js
P.gapY=Math.max(.18,Math.min(.82,(Ol*fl-sl)/(I-sl)))
```

---

## 2. Game khóa khả năng vỗ cánh khi điểm >= 5

Hàm xử lý input có đoạn:

```js
qt=()=>{
  if(rl==="gameover")Ge();
  else if(Il>=5)return;

  G();
  al();
  ma("flap",220);
  rl="playing";
  S=kl.flap;
  xt("playing");
}
```

Dòng quan trọng là:

```js
else if(Il>=5)return;
```

Khi `Il` (điểm hiện tại) đạt từ `5` trở lên, thao tác Space / Enter / Arrow Up / click vẫn gọi nhưng sẽ thoát ngay trước khi áp lực vỗ cánh.

---


## 3. Điểm cao nhất chỉ được lưu ở máy của người chơi

Best score được đọc bằng:

```js
Number(localStorage.getItem("flappy-meme-best")||0)
```

và được lưu bằng:

```js
localStorage.setItem("flappy-meme-best",String(at))
```

Điều này có nghĩa là best score hiển thị trên trang không phải dữ liệu do server xác thực.

Có thể thay đổi trực tiếp bằng Console:

```js
localStorage.setItem("flappy-meme-best", "999999");
location.reload();
```

<img width="508" height="439" alt="image" src="https://github.com/user-attachments/assets/c623dca5-4a9b-4fa4-8660-1c06cb0b56ac" />

## 4. Ý tưởng về “God Mode”

Nếu muốn tạo bản bất tử để test/debug, cần xử lý ít nhất ba chỗ:

```text
1. Bỏ khóa input Il>=5.
2. Tắt va chạm với ống -> eu().
3. Tắt hoặc clamp va chạm trần/sàn thay vì gọi -> eu().
```
# Update: 

Hiện tại thì tôi đã cheat xong con game này r, yêu cầu tampermonkey và một chút kinh nghiệm về cách dùng tampermonkey. Bạn có thể cài nó qua [flappybruhxuanngoc.user.js](https://raw.githubusercontent.com/akikohatsune/flappybruhxuanngoc/main/flappybruhxuanngoc.user.js) sau đó thì tận hưởng thành quả thôi:)

https://github.com/user-attachments/assets/6cea39be-19d9-4bd6-b885-577b29049e2b

## Kết luận

Như tôi đã nói hoặc chưa nói thì bạn cũng có thể hiểu cái game của l này làm ra chỉ để ragebait, còn chú ấy bảo tôi rảnh thì tôi rảnh thì tôi đang không có việc gì để làm=)))))

<img width="349" height="360" alt="image" src="https://github.com/user-attachments/assets/c209df3c-638f-4779-bbbe-b561a83eda6d" />

## License

CC0 cho các bạn phá nhé:)
