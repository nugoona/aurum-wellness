# ============================================
# Aurum MEDIA — 영상 8편 압축 + 포스터 추출
# Source: D:\영상자동화프로젝트\영상작업\0422 촬영
# Target: D:\github\ngn_homepage\aurum\public\videos\media
# ============================================
$ErrorActionPreference = 'Stop'
$src = 'D:\영상자동화프로젝트\영상작업\0422 촬영'
$dst = 'D:\github\ngn_homepage\aurum\public\videos\media'

# 매핑: 원본 → 출력 슬러그 → (vertical|horizontal-hero|horizontal-long)
$jobs = @(
  @{ in = '아우르메_홍보영상_v2.mp4';                  out = 'hero';          type = 'horizontal-hero' }
  @{ in = '샵소개_30s.mp4';                             out = 'voices-shop';   type = 'vertical' }
  @{ in = '김준경 실장님.mp4';                          out = 'voices-master'; type = 'vertical' }
  @{ in = '마사지로 병을 고친다-.mp4';                  out = 'philo-01';      type = 'vertical' }
  @{ in = '아픈마사지가 좋다고요-.mp4';                 out = 'philo-02';      type = 'vertical' }
  @{ in = '연인·가족과 즐기는 맞춤 마사지.mp4';         out = 'philo-03';      type = 'vertical' }
  @{ in = '인천 유일 달고 공식 파트너.mp4';             out = 'philo-04';      type = 'vertical' }
  @{ in = '아로마마사지.mp4';                           out = 'stillness';     type = 'horizontal-long' }
)

$total = $jobs.Count
$i = 0
foreach ($job in $jobs) {
  $i++
  $inPath = Join-Path $src $job.in
  $outVid = Join-Path $dst "$($job.out).mp4"
  $outPos = Join-Path $dst "$($job.out).jpg"

  if (-not (Test-Path -LiteralPath $inPath)) { Write-Host "MISSING: $inPath"; continue }

  Write-Host "[$i/$total] $($job.out) ← $($job.in) ($($job.type))"

  switch ($job.type) {
    'horizontal-hero' {
      # 16:9 — 1280x720, CRF 23 (좋은 품질)
      & ffmpeg -y -hide_banner -loglevel error -stats `
        -i "$inPath" `
        -c:v libx264 -preset medium -crf 23 `
        -vf "scale=1280:720:flags=lanczos" `
        -c:a aac -b:a 128k -ac 2 `
        -movflags +faststart -pix_fmt yuv420p `
        "$outVid"
    }
    'horizontal-long' {
      # 16:9 긴 영상 — 1280x720, CRF 26 (긴 길이 보정)
      & ffmpeg -y -hide_banner -loglevel error -stats `
        -i "$inPath" `
        -c:v libx264 -preset medium -crf 26 `
        -vf "scale=1280:720:flags=lanczos" `
        -c:a aac -b:a 96k -ac 2 `
        -movflags +faststart -pix_fmt yuv420p `
        "$outVid"
    }
    'vertical' {
      # 9:16 — 720x1280, CRF 25
      & ffmpeg -y -hide_banner -loglevel error -stats `
        -i "$inPath" `
        -c:v libx264 -preset medium -crf 25 `
        -vf "scale=720:1280:flags=lanczos" `
        -c:a aac -b:a 96k -ac 2 `
        -movflags +faststart -pix_fmt yuv420p `
        "$outVid"
    }
  }

  # 포스터: 영상 시작 1.5초 지점 (검은 프레임 회피)
  & ffmpeg -y -hide_banner -loglevel error `
    -ss 1.5 -i "$inPath" -frames:v 1 -q:v 4 `
    "$outPos"

  $vidSize = [math]::Round((Get-Item $outVid).Length / 1MB, 2)
  $posSize = [math]::Round((Get-Item $outPos).Length / 1KB, 0)
  Write-Host "  → $($job.out).mp4 ($vidSize MB) + $($job.out).jpg ($posSize KB)"
}

Write-Host ""
Write-Host "=== Done ==="
$totalSize = (Get-ChildItem $dst -File | Measure-Object Length -Sum).Sum / 1MB
Write-Host ("Output total: {0:N1} MB" -f $totalSize)
Get-ChildItem $dst -File | Sort-Object Name | Format-Table Name, @{n='MB';e={[math]::Round($_.Length/1MB,2)}}
