pkgname=bolt-launcher-appimage
pkgver=0.10.0
pkgrel=1
pkgdesc="Free open-source third-party implementation of the Jagex Launcher"
license=('AGPL3')
url="https://bolt.adamcake.com/"
arch=('x86_64')
depends=('alsa-lib' 'at-spi2-core' 'cairo' 'dbus' 'expat' 'fmt' 'gcc-libs' 'gdk-pixbuf2'
         'glib2' 'glibc' 'gtk3' 'hicolor-icon-theme' 'libarchive' 'libdrm' 'libx11' 'libxcb'
         'libxcomposite' 'libxdamage' 'libxext' 'libxfixes' 'libxkbcommon' 'libxrandr' 'mesa'
         'nspr' 'nss' 'pango')
makedepends=('cmake' 'git' 'nodejs' 'npm')
optdepends=('jre17-openjdk: runelite/hdos' 'gtk2: rs3' 'openssl-1.1: rs3')
source=("git+https://github.com/0xGingi/Bolt.git"
        "https://adamcake.com/cef/cef-114.0.5735.134-linux-x86_64-minimal-ungoogled.tar.gz"
        "fmt.patch"
        "cef-no-fortify.patch")
sha256sums=('SKIP'
            'SKIP'
            'SKIP'
            'SKIP')

prepare() {
  git -C "$srcdir/Bolt" submodule update --init --recursive
  git -C "$srcdir/Bolt" apply "$srcdir/fmt.patch"
  patch -p1 -d "$srcdir/cef_binary_114.2.11+g87c8807+chromium-114.0.5735.134_linux64_minimal" < "$srcdir/cef-no-fortify.patch"

  # Build frontend
  cd "$srcdir/Bolt/app"
  npm install -g bun
  bun install
  bun run build
}

build() {
  cmake -S Bolt -B build -G "Unix Makefiles" \
    -D CMAKE_BUILD_TYPE=Release \
    -D CEF_ROOT="$srcdir"/cef_binary_114.2.11+g87c8807+chromium-114.0.5735.134_linux64_minimal \
    -D CMAKE_INSTALL_PREFIX="$pkgdir" \
    -D BOLT_BINDIR=usr/bin \
    -D BOLT_LIBDIR=usr/lib \
    -D BOLT_SHAREDIR=usr/share \
    -D BOLT_META_NAME="$pkgname" \
    -D BOLT_SKIP_LIBRARIES=1
  cmake --build build
}

package() {
  cmake --install build
} 