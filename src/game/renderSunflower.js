const SCALE = 4;
const CANVAS_SIZE = 320;

const STEM_LIGHT = '#9af6b8';
const STEM_DARK = '#69c687';
const LEAF = '#5dbf74';
const LEAF_LIGHT = '#8ff5ae';
const PETAL_GOLD = '#ffdd7c';
const PETAL_WARM = '#ffaa78';
const CORE_DARK = '#2d2100';
const CORE_MID = '#523b00';
const BUD_GOLD = '#eebe00';

function px(ctx, x, y, w = 1, h = 1, color = '#ffdd7c') {
  ctx.fillStyle = color;
  ctx.fillRect(x * SCALE, y * SCALE, w * SCALE, h * SCALE);
}

function drawSoil(ctx) {
  px(ctx, 0, 64, 80, 16, '#3a2416');
  px(ctx, 0, 68, 80, 12, '#4f3220');
  px(ctx, 2, 66, 4, 1, '#6b452d');
  px(ctx, 18, 70, 6, 1, '#6b452d');
  px(ctx, 42, 67, 5, 1, '#6b452d');
  px(ctx, 60, 72, 7, 1, '#6b452d');
}

function drawSeed(ctx) {
  px(ctx, 38, 58, 2, 2, '#ffdd7c');
  px(ctx, 40, 58, 1, 2, '#d5ac37');
}

function drawStem(ctx, height) {
  const top = 58 - height;
  px(ctx, 39, top, 2, height, STEM_LIGHT);
  px(ctx, 41, top + 1, 1, Math.max(height - 1, 1), STEM_DARK);
}

function drawSprout(ctx, growth) {
  const height = 5 + Math.round(growth / 12);
  const top = 58 - height;

  drawStem(ctx, height);
  px(ctx, 37, top + 2, 2, 1, LEAF_LIGHT);
  px(ctx, 42, top + 1, 2, 1, LEAF);
  px(ctx, 36, top + 3, 1, 1, LEAF);
  px(ctx, 44, top + 2, 1, 1, LEAF_LIGHT);
}

function drawYoungLeaves(ctx) {
  px(ctx, 36, 48, 2, 1, LEAF_LIGHT);
  px(ctx, 34, 49, 3, 1, LEAF);
  px(ctx, 42, 46, 2, 1, LEAF_LIGHT);
  px(ctx, 44, 47, 3, 1, LEAF);
}

function drawFullLeaves(ctx) {
  px(ctx, 34, 43, 3, 1, LEAF_LIGHT);
  px(ctx, 32, 44, 4, 1, LEAF);
  px(ctx, 31, 45, 2, 1, LEAF);
  px(ctx, 43, 46, 3, 1, LEAF_LIGHT);
  px(ctx, 45, 47, 4, 1, LEAF);
  px(ctx, 47, 48, 2, 1, LEAF);
}

function drawBud(ctx) {
  px(ctx, 38, 34, 4, 3, BUD_GOLD);
  px(ctx, 39, 33, 2, 1, PETAL_GOLD);
  px(ctx, 39, 37, 2, 1, CORE_MID);
}

function drawBloomBase(ctx) {
  px(ctx, 38, 30, 4, 2, BUD_GOLD);
  px(ctx, 37, 31, 6, 1, BUD_GOLD);
}

function drawFlower(ctx, pulseFrame) {
  const petalColor = pulseFrame % 2 === 0 ? PETAL_GOLD : PETAL_WARM;

  px(ctx, 38, 18, 4, 2, petalColor);
  px(ctx, 35, 20, 3, 2, petalColor);
  px(ctx, 42, 20, 3, 2, petalColor);
  px(ctx, 32, 23, 4, 3, petalColor);
  px(ctx, 44, 23, 4, 3, petalColor);
  px(ctx, 31, 27, 4, 3, petalColor);
  px(ctx, 45, 27, 4, 3, petalColor);
  px(ctx, 32, 32, 4, 2, petalColor);
  px(ctx, 44, 32, 4, 2, petalColor);
  px(ctx, 35, 35, 3, 2, petalColor);
  px(ctx, 42, 35, 3, 2, petalColor);
  px(ctx, 38, 36, 4, 2, petalColor);

  px(ctx, 36, 22, 8, 14, CORE_MID);
  px(ctx, 37, 23, 6, 12, CORE_DARK);
  px(ctx, 39, 25, 2, 8, '#1d1500');
}

function spritePx(ctx, x, y, w = 1, h = 1, color = PETAL_GOLD) {
  const scale = 2;
  ctx.fillStyle = color;
  ctx.fillRect(x * scale, y * scale, w * scale, h * scale);
}

export function renderBurstSunflower(ctx, { pulseFrame = 0, variant = 0 }) {
  ctx.clearRect(0, 0, 64, 84);
  ctx.imageSmoothingEnabled = false;

  const petalColor = (pulseFrame + variant) % 2 === 0 ? PETAL_GOLD : PETAL_WARM;
  const stemShift = variant % 2;

  spritePx(ctx, 30 - stemShift, 44, 3, 22, STEM_LIGHT);
  spritePx(ctx, 32 - stemShift, 45, 1, 20, STEM_DARK);

  spritePx(ctx, 24 - stemShift, 52, 4, 1, LEAF_LIGHT);
  spritePx(ctx, 21 - stemShift, 53, 4, 1, LEAF);
  spritePx(ctx, 34 - stemShift, 50, 4, 1, LEAF_LIGHT);
  spritePx(ctx, 38 - stemShift, 51, 4, 1, LEAF);

  spritePx(ctx, 29 - stemShift, 17, 5, 2, petalColor);
  spritePx(ctx, 25 - stemShift, 20, 4, 2, petalColor);
  spritePx(ctx, 35 - stemShift, 20, 4, 2, petalColor);
  spritePx(ctx, 22 - stemShift, 24, 5, 3, petalColor);
  spritePx(ctx, 37 - stemShift, 24, 5, 3, petalColor);
  spritePx(ctx, 22 - stemShift, 30, 4, 2, petalColor);
  spritePx(ctx, 38 - stemShift, 30, 4, 2, petalColor);
  spritePx(ctx, 27 - stemShift, 33, 4, 2, petalColor);
  spritePx(ctx, 34 - stemShift, 33, 4, 2, petalColor);
  spritePx(ctx, 30 - stemShift, 34, 3, 1, petalColor);

  spritePx(ctx, 27 - stemShift, 22, 10, 12, CORE_MID);
  spritePx(ctx, 29 - stemShift, 24, 6, 8, CORE_DARK);
}

export function renderClusterSunflower(
  ctx,
  { pulseFrame = 0, variant = 0, progress = 0, stemHeight = 24, lean = 0 },
) {
  ctx.clearRect(0, 0, 96, 176);
  ctx.imageSmoothingEnabled = false;

  if (progress <= 0) {
    return;
  }

  const petalColor = (pulseFrame + variant) % 2 === 0 ? PETAL_GOLD : PETAL_WARM;
  const stemShift = variant % 2;
  const leanOffset = Math.sign(lean);
  const stemTop = 78 - stemHeight;

  spritePx(ctx, 30 - stemShift + leanOffset, stemTop, 3, stemHeight, STEM_LIGHT);
  spritePx(ctx, 32 - stemShift + leanOffset, stemTop + 1, 1, stemHeight - 1, STEM_DARK);
  spritePx(ctx, 30 - stemShift, 79, 2, 2, '#ffdd7c');

  spritePx(ctx, 25 - stemShift + leanOffset, stemTop + 9, 4, 1, LEAF_LIGHT);
  spritePx(ctx, 22 - stemShift + leanOffset, stemTop + 10, 4, 1, LEAF);
  spritePx(ctx, 34 - stemShift + leanOffset, stemTop + 7, 4, 1, LEAF_LIGHT);
  spritePx(ctx, 38 - stemShift + leanOffset, stemTop + 8, 4, 1, LEAF);

  spritePx(ctx, 29 - stemShift + leanOffset, stemTop - 16, 5, 2, petalColor);
  spritePx(ctx, 25 - stemShift + leanOffset, stemTop - 13, 4, 2, petalColor);
  spritePx(ctx, 35 - stemShift + leanOffset, stemTop - 13, 4, 2, petalColor);
  spritePx(ctx, 23 - stemShift + leanOffset, stemTop - 9, 4, 3, petalColor);
  spritePx(ctx, 37 - stemShift + leanOffset, stemTop - 9, 4, 3, petalColor);
  spritePx(ctx, 24 - stemShift + leanOffset, stemTop - 3, 4, 2, petalColor);
  spritePx(ctx, 36 - stemShift + leanOffset, stemTop - 3, 4, 2, petalColor);
  spritePx(ctx, 29 - stemShift + leanOffset, stemTop, 5, 2, petalColor);
  spritePx(ctx, 27 - stemShift + leanOffset, stemTop - 12, 10, 12, CORE_MID);
  spritePx(ctx, 29 - stemShift + leanOffset, stemTop - 10, 6, 8, CORE_DARK);
}

export function renderBee(ctx, { pulseFrame = 0, variant = 0 }) {
  ctx.clearRect(0, 0, 48, 32);
  ctx.imageSmoothingEnabled = false;

  const wingLift = (pulseFrame + variant) % 2 === 0 ? 0 : -1;
  const stripe = variant % 2 === 0 ? '#ffbf1f' : '#ffaa00';

  spritePx(ctx, 10, 8 + wingLift, 4, 2, '#d8f7ff');
  spritePx(ctx, 14, 7 + wingLift, 4, 2, '#f4ffff');
  spritePx(ctx, 12, 11, 7, 4, '#2d2100');
  spritePx(ctx, 13, 10, 5, 1, stripe);
  spritePx(ctx, 13, 12, 5, 1, stripe);
  spritePx(ctx, 13, 14, 5, 1, stripe);
  spritePx(ctx, 10, 12, 2, 2, '#0e0e0e');
  spritePx(ctx, 19, 12, 2, 2, '#0e0e0e');
  spritePx(ctx, 20, 11, 2, 1, '#5dbf74');
}

function drawGrowingStem(ctx, growth, pulseFrame) {
  if (growth < 18) {
    return;
  }

  if (growth < 38) {
    drawSprout(ctx, growth);
    return;
  }

  if (growth < 60) {
    drawStem(ctx, 18 + Math.round((growth - 38) / 3));
    drawYoungLeaves(ctx);
    drawBud(ctx);
    return;
  }

  drawStem(ctx, 30);
  drawFullLeaves(ctx);

  if (growth < 84) {
    drawBloomBase(ctx);
    drawBud(ctx);
    return;
  }

  drawFlower(ctx, pulseFrame);
}

function drawHydrationPulse(ctx, hydration) {
  const width = Math.max(2, Math.round(hydration / 12));
  px(ctx, 6, 8, width, 1, '#ffaa78');
  px(ctx, 6, 10, Math.max(1, width - 2), 1, '#9af6b8');
}

function drawGrid(ctx) {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';

  for (let x = 0; x < CANVAS_SIZE; x += SCALE * 4) {
    ctx.fillRect(x, 0, 1, CANVAS_SIZE);
  }

  for (let y = 0; y < CANVAS_SIZE; y += SCALE * 4) {
    ctx.fillRect(0, y, CANVAS_SIZE, 1);
  }
}

export function renderSunflower(ctx, { stageKey, hydration, growth, pulseFrame }) {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.imageSmoothingEnabled = false;

  ctx.fillStyle = '#050505';
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  drawGrid(ctx);
  drawHydrationPulse(ctx, hydration);
  drawSoil(ctx);
  drawSeed(ctx);
  drawGrowingStem(ctx, growth, pulseFrame);
}
