#version 120

uniform float time;
uniform vec2 size;
uniform vec2 mouse;

float rand2(vec2 co){ 
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453) * 2.0 - 1.0;
}

float hermite(float t)
{
  return t * t * (3.0 - 2.0 * t);
}

float snoise2(vec2 co, float frequency)
{
  vec2 v = vec2(co.x * frequency, co.y * frequency);

  float ix1 = floor(v.x);
  float iy1 = floor(v.y);
  float ix2 = floor(v.x + 1.0);
  float iy2 = floor(v.y + 1.0);

  float fx = hermite(fract(v.x));
  float fy = hermite(fract(v.y));

  float fade1 = mix(rand2(vec2(ix1, iy1)), rand2(vec2(ix2, iy1)), fx);
  float fade2 = mix(rand2(vec2(ix1, iy2)), rand2(vec2(ix2, iy2)), fx);

  return mix(fade1, fade2, fy);
}

float pnoise2(vec2 co, float freq, int steps, float persistence)
{
  float value = 0.0;
  float ampl = 1.0;
  float sum = 0.0;
  for(int i=0 ; i<steps ; i++)
  {
    sum += ampl;
    value += snoise2(co, freq) * ampl;
    freq *= 2.0;
    ampl *= persistence;
  }
  return value / sum;
}

void main( void ) {

	vec2 pos = vec2(gl_FragCoord.x / size.x, gl_FragCoord.y / size.y); 
	vec2 cur = vec2(mouse.x / size.x, mouse.y / size.y); 

	float value = pnoise2(pos, cur.x * 100.0, 3, 0.5);

  	float lum = value * 0.5 * cur.y + 0.5;

    gl_FragColor = vec4(lum,lum,lum,1.0);

}