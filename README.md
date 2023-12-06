<p align="center">
  <img width="400" src="https://user-images.githubusercontent.com/4658208/60469862-2e40bf00-9c2c-11e9-87f7-afe164648de4.png">
  <h3 align="center">waka-box</h3>
  <p align="center">Update a pinned gist to contain your weekly WakaTime stats</p>
</p>

## [English](#english) | [中文](#中文)

## English

> 📌✨ For more pinned-gist projects like this one, check out: https://github.com/matchai/awesome-pinned-gists

## Setup

### Prep work

1. Create a new public GitHub Gist (https://gist.github.com/)
1. Create a token with the `gist` scope and copy it. (https://github.com/settings/tokens/new)
1. Create a WakaTime account (https://wakatime.com/signup)
1. In your WakaTime profile settings (https://wakatime.com/settings/profile) ensure `Display coding activity publicly` and `Display languages, editors, operating systems publicly` are checked.
1. In your account settings, copy the existing WakaTime API Key (https://wakatime.com/settings/api-key)

### Project setup

1. Fork this repo
1. Edit the [environment variable](https://github.com/matchai/waka-box/blob/master/.github/workflows/schedule.yml#L13-L15) in `.github/workflows/schedule.yml`:

   - **GIST_ID:** The ID portion from your gist url: `https://gist.github.com/matchai/`**`6d5f84419863089a167387da62dd7081`**.

1. Go to the repo **Settings > Secrets**
1. Add the following environment variables:

   - **GH_TOKEN:** The GitHub token generated above.
   - **WAKATIME_API_KEY:** The API key for your WakaTime account.

## 中文

### 准备工作

1. 创建一个新的公开 GitHub Gist（[https://gist.github.com/](https://gist.github.com/)）
2. 创建一个具有 `gist` 范围的令牌并复制它。（[创建令牌](https://github.com/settings/tokens/new)）
3. 创建一个 WakaTime 账号（[立即注册](https://wakatime.com/signup)）
4. 在您的 WakaTime 个人资料设置中确认 `公开显示编码活动` 和 `公开显示编程语言，编辑器，操作系统` 已被勾选。（[设置](https://wakatime.com/settings/profile)）
5. 在您的账户设置中复制现有的 WakaTime API 密钥。（[API 密钥](https://wakatime.com/settings/api-key)）

### 项目设置

1. Fork 这个仓库。
2. 编辑 `.github/workflows/schedule.yml`（第 13-15 行）中的环境变量，以包含您的 `GIST_ID`。示例 Gist 链接：`https://gist.github.com/matchai/6d5f84419863089a167387da62dd7081` - `GIST_ID` 是最后一部分：`6d5f84419863089a167387da62dd7081`。
3. 转到仓库 **设置 > 密钥**。
4. 添加以下环境变量：
   - **GH_TOKEN:** 上面生成的 GitHub 令牌。
   - **WAKATIME_API_KEY:** 您的 WakaTime 账户的 API 密钥。

使用 Github 令牌的示例：

<img width="500" src="https://raw.githubusercontent.com/Trade-Offf/PictureBed/main/imgs/%E6%88%AA%E5%B1%8F2023-12-06%2017.45.30.png">
